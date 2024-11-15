const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { getCardData, checkCardOwn, checkUser } = require(appRoot + 'src/utils/db/queries')
var { Rarity } = require(appRoot + 'src/utils/exporter')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('viewcard')
        .setDescription ("This command is to view an existing card from the database.")
        .addStringOption(option =>
	      option
            .setName('card')
			.setDescription('The card you want to lookup')
			.setRequired(true)
        ),
    // Main function
    async execute(interaction, cardsdb){
        // Get information about the card to check
        const cardName = interaction.options.getString('card');
        const outputCard = await getCardData(cardsdb, cardName)
        // Card does not exist
        if (outputCard === null){
            await interaction.reply("This card could not be found!")
            return;
        }

        // Query if the user has the card
        const queryId = await checkUser(cardsdb, interaction.user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']
        const cardOwned = await checkCardOwn(cardsdb, dbId, outputCard['card_id'])

        // Build embed with the necessary information
        const cardColor = Rarity[outputCard['card_rarity_id']].color
        const cardIcon = Rarity[outputCard['card_rarity_id']].icons
        var footerText = ""
        if (cardOwned === true){footerText="You own this card"}
        else {footerText="You don't own this card"}
        var embed = new EmbedBuilder()
            .setTitle(`__${outputCard['card_name']}__`)
            .setImage(outputCard['card_img_url'])
            .setColor(cardColor)
            .setFooter({ text: `ID: ${outputCard['card_id']}  |  ${footerText}` , iconURL: cardIcon})
            
        await interaction.reply({
            embeds: [embed],
        })
    }
}
