const { SlashCommandBuilder, DefaultWebSocketManagerOptions } = require("discord.js")
var { checkDupes } = require('../../utils/queries.js')
var { deleteCard } = require('../../utils/manips.js')
var { rarityRequest } = require('../../utils/functionExporter.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('scrape')
        .setDescription ("Scrape duplicate cards")
        .addSubcommand(subcommand =>
            subcommand
                .setName('specific')
                .setDescription('Scrape a specific card')
                .addStringOption(option => 
                    option
                      .setName('card')
                      .setDescription('Card to scrape')
                      .setRequired(true)
                )
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('collection')
                .setDescription('Scrape a collection of cards')
                .addStringOption(option =>
                    option
                      .setName('type')
                      .setDescription('Choose what to scrape')
                      .setRequired(true)
                      .addChoices(
                        {name: 'Normal Cards', value: 'normal'},
                        {name: 'Rare Cards', value: 'rare'},
                        {name: 'Ultra Rare Cards', value: 'ultrarare'},
                        {name: 'All Cards', value: 'all'},
                    )
            )
        ),
    // Main function
    async execute(interaction, cardsdb){
        if (await checkDupes(cardsdb, interaction.user.id) === false) return await interaction.reply("You have no duplicate cards!")
        var arg = ''
        if (interaction.options.getSubcommand() === 'collection') arg = interaction.options.getString('type')
        else arg = interaction.options.getString('card')
        switch(arg){
            case 'normal':
                break;
            case 'rare':
                break;
            case 'ultrarare':
                break;
            case 'all':
                break;
            default:
                deleteCard(cardsdb, interaction.user.id, arg)
                break;
        }
    }
}