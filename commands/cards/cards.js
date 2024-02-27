const { SlashCommandBuilder } = require("discord.js")
var { cardEmbed, cardsMaxPage, cardRow } = require('../../utils/functionExporter.js')
var { countCards } = require('../../utils/queries.js')

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
        var page = interaction.options.getInteger('page') ?? 1;

        if ((await countCards(cardsdb, user.id)) <= 0){
            if (user.id === interaction.user.id) await interaction.reply("You don't have any cards!");
            else await interaction.reply(`${user.username} doesn't have any cards!`);
        }

        var maxPage = await cardsMaxPage(cardsdb, user.id)
        var row = await cardRow(page, maxPage)
        var embed = await cardEmbed(cardsdb, user.id, page)

        await interaction.reply({
            embeds: [embed],
            components: [row],
        })
    }
}