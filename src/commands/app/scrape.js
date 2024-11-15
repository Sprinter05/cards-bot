const { SlashCommandBuilder } = require("discord.js")
var { checkDupes, checkUser } = require(appRoot + 'src/utils/db/queries')
var { scrapeCard, scrapeCollection, updateMoney } = require(appRoot + 'src/utils/db/manips')
var { cEmoji } = require(appRoot + 'config/properties.json');

module.exports = {
    // Define data to export to Discord
    // This works with subcommands instead of arguments
    // It shows as 2 different commands
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
                        {name: 'All Cards', value: 'all'}
                    )
            )
        ),
    // Main function
    async execute(interaction, cardsdb){
        // Get database information on the user
        const queryId = await checkUser(cardsdb, interaction.user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']
        // If we are scraping a collection we check if the user has duplicates
        if (await checkDupes(cardsdb, dbId) === false && interaction.options.getSubcommand() === 'collection') 
            return await interaction.reply("You have no duplicate cards!")
        
        // Get the card type to scrape if its a collection or the single card otherwise
        var arg = ''
        if (interaction.options.getSubcommand() === 'collection') arg = interaction.options.getString('type')
        else arg = interaction.options.getString('card')
        // Switch case with all possible options that updates money accordingly
        switch(arg){
            case 'normal':
                let nMoney = await scrapeCollection(cardsdb, dbId, 1)
                if (nMoney === -1) return await interaction.reply(`You don't have duplicate Normal cards!`)
                updateMoney(cardsdb, dbId, nMoney)
                await interaction.reply(`Scraped duplicate Normal cards for **${nMoney}** ${cEmoji}`)
                break;
            case 'rare':
                let rMoney = await scrapeCollection(cardsdb, dbId, 2)
                if (rMoney === -1) return await interaction.reply(`You don't have duplicate Rare cards!`)
                updateMoney(cardsdb, dbId, rMoney)
                await interaction.reply(`Scraped duplicate Rare cards for **${rMoney}** ${cEmoji}`)
                break;
            case 'ultrarare':
                let urMoney = await scrapeCollection(cardsdb, dbId, 3)
                if (urMoney === -1) return await interaction.reply(`You don't have duplicate Ultra Rare cards!`)
                updateMoney(cardsdb, dbId, urMoney)
                await interaction.reply(`Scraped duplicate Ultra Rare cards for **${urMoney}** ${cEmoji}`)
                break;
            case 'all':
                let tMoney = 0
                let tArrMoney = [];
                tArrMoney[0] = await scrapeCollection(cardsdb, dbId, 1)
                tArrMoney[1] = await scrapeCollection(cardsdb, dbId, 2)
                tArrMoney[2] = await scrapeCollection(cardsdb, dbId, 3)
                for(let i=0; i<3; i++){
                    tMoney += tArrMoney[i] === -1 ? 0 : tArrMoney[i]
                }
                if (tMoney === 0) return await interaction.reply(`You don't have any duplicate cards!`)
                updateMoney(cardsdb, dbId, tMoney)
                await interaction.reply(`Scraped all duplicate cards for **${tMoney}** ${cEmoji}`)
                break;
            default: // Scraping a specific card if the user has it
                let dMoney = await scrapeCard(cardsdb, dbId, arg)
                if (dMoney === -1) return await interaction.reply(`You don't have that card!`)
                updateMoney(cardsdb, dbId, dMoney)
                await interaction.reply(`Scraped card **${arg}** for **${dMoney}** ${cEmoji}`)
                break;
        }
    }
}