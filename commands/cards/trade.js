const { SlashCommandBuilder } = require("discord.js")
var { cardEmbed, cardsMaxPage, cardRow } = require('../../utils/functionExporter.js')
var { countCards, checkUser, getCardData } = require('../../utils/queries.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('trade')
        .setDescription ("Use this command to trade a card with another user.")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to trade with.')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('card')
            .setDescription('Card to trade.')
            .setRequired(true)
        ),
    // Main function
    async execute(interaction, cardsdb){
        const userToTrade = interaction.options.getUser('user');
        const user = interaction.user;
        const userQueryId = await checkUser(cardsdb, user.id)
        const userTTQueryId = await checkUser(cardsdb, userToTrade.id)
        const dbId = userQueryId === null ? -1 : queryId['user_id']
        const dbTTId = userTTQueryId === null ? -1 : queryId['user_id']
        var cardTTOne = interaction.options.getInteger('card');
        const queryCard = await getCardData(cardsdb, cardTTOne)

        if ((await countCards(cardsdb, dbId)) <= 0 ) return await interaction.reply("You don't have any cards!");
        else if ((await countCards(cardsdb, dbTTId)) <= 0) return await interaction.reply(`${userToTrade.username} doesn't have any cards!`);

        var embed = new EmbedBuilder()
        .setTitle(`${user.username} wants to trade the card "${queryCard[0]['card_name']}"`)
        .setImage(queryCard['card_img_url'])
        .setColor(cardColor)
        .setFooter({ text: `ID: ${outputCard['card_id']}  |  ${footerText}` , iconURL: cardIcon})

        await interaction.reply({
            embeds: [embed],
            components: [row],
        })
    }
}