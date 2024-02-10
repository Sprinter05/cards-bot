const { SlashCommandBuilder } = require("discord.js")
var { cardEmbed, cardsMaxPage, cardRow } = require('../../utils/cardCreator.js')
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
            await interaction.reply("You don't have any cards!");
            return;
        }

        var maxPage = await cardsMaxPage(cardsdb, user.id)
        var rRow = await cardRow(page, maxPage)
        var rEmbed = await cardEmbed(cardsdb, user.id, page)

        await interaction.reply({
            embeds: [rEmbed],
            components: [rRow],
        })
    }
}