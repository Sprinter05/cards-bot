const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { getCardData, checkCardOwn, checkUser } = require('../../utils/queries.js')
var { rarityRequest } = require('../../utils/functionExporter.js')

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
        const cardName = interaction.options.getString('card');
        const outputCard = await getCardData(cardsdb, cardName)
        if (outputCard.length === 0){
            await interaction.reply("This card could not be found!")
            return;
        }

        const queryId = await checkUser(cardsdb, interaction.user.id)
        const dbId = queryId.length === 0 ? -1 : queryId['user_id']

        const cardOwned = await checkCardOwn(cardsdb, dbId, outputCard['card_id'])
        const cardColor = rarityRequest(outputCard['card_rarity_id'], 'color')
        const cardIcon = rarityRequest(outputCard['card_rarity_id'], 'iconURL')
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
