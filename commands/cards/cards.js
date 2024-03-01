const { SlashCommandBuilder } = require("discord.js")
var { cardEmbed, cardsMaxPage, cardRow } = require('../../utils/functionExporter.js')
var { countCards, checkUser } = require('../../utils/queries.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('cards')
        .setDescription ("This command is to see yours or someone elses cards.")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to look cards for.')
            .setRequired(false)  
        )
        .addIntegerOption(option =>
          option
            .setName('page')
            .setDescription('Page to look for (10 entries per page)')
            .setRequired(false)
            .setMinValue(1)
        ),
    // Main function
    async execute(interaction, cardsdb){
        const user = interaction.options.getUser('user') ?? interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId.length === 0 ? -1 : queryId[0]['user_id']
        var page = interaction.options.getInteger('page') ?? 1;

        if ((await countCards(cardsdb, dbId)) <= 0){
            if (user.id === interaction.user.id) return await interaction.reply("You don't have any cards!");
            else return await interaction.reply(`${user.username} doesn't have any cards!`);
        }

        const msgEqId = interaction.user.id === user.id ? 0 : user.username
        var maxPage = await cardsMaxPage(cardsdb, dbId)
        var row = await cardRow(page, maxPage)
        var embed = await cardEmbed(cardsdb, dbId, msgEqId, page)

        await interaction.reply({
            embeds: [embed],
            components: [row],
        })
    }
}