const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { getCardData, checkCardOwn } = require('../../utils/queries.js')
var { rarityColor } = require('../../utils/cardCreator.js')

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

        const cardOwned = await checkCardOwn(cardsdb, interaction.user.id, outputCard[0]['card_id'])
        const cardColor = await rarityColor(cardsdb, outputCard[0]['card_rarity_id'])
        var footerText = ""
        if (cardOwned === true){footerText="You own this card"}
        else {footerText="You don't own this card"}
        
        var cEmbed = new EmbedBuilder()
            .setTitle(`__${outputCard[0]['card_name']}__`)
            .setImage(outputCard[0]['card_img_url'])
            .setColor(cardColor)
            .setFooter({ text: `ID: ${outputCard[0]['card_id']}  |  ${footerText}` })
        await interaction.reply({
            embeds: [cEmbed],
        })
    }
}
