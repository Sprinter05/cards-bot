const { SlashCommandBuilder } = require("discord.js")
var { cardEmbed, cardsMaxPage, cardRow } = require(appRoot + 'src/utils/exporter')
var { countCards, checkUser } = require(appRoot + 'src/utils/db/queries')

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
        // If user is not specified use the person that ran the command
        const user = interaction.options.getUser('user') ?? interaction.user;
        // Get database entry and page for the user
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']
        var page = interaction.options.getInteger('page') ?? 1;

        // Check if the user has no cards
        if ((await countCards(cardsdb, dbId)) <= 0){
            if (user.id === interaction.user.id) return await interaction.reply("You don't have any cards!");
            else return await interaction.reply(`${user.username} doesn't have any cards!`);
        }

        // Create response
        const msgEqId = interaction.user.id === user.id ? 0 : user.username
        var maxPage = await cardsMaxPage(cardsdb, dbId)
        var row = await cardRow(page, maxPage)
        var embed = await cardEmbed(cardsdb, dbId, msgEqId, interaction.user.avatarURL(), page)

        await interaction.reply({
            embeds: [embed],
            components: [row],
        })
    }
}