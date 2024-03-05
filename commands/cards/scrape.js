const { SlashCommandBuilder, DefaultWebSocketManagerOptions } = require("discord.js")
var { checkDupes, checkUser } = require('../../utils/queries.js')
var { scrapeCard, updateMoney } = require('../../utils/manips.js')
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
        const queryId = await checkUser(cardsdb, interaction.user.id)
        const dbId = queryId.length === 0 ? -1 : queryId[0]['user_id']
        if (await checkDupes(cardsdb, dbId) === false && interaction.options.getSubcommand() === 'collection') return await interaction.reply("You have no duplicate cards!")
        
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
                let money = await scrapeCard(cardsdb, dbId, arg)
                if (money === -1) return await interaction.reply(`You don't have that card!`)
                updateMoney(cardsdb, dbId, money)
                await interaction.reply(`Scraped card **${arg}** for **${money}** <:coin:1214561654629728326>`)
                break;
        }
    }
}