const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { packInfo, getRarityCardsList, checkCardQuantity, queryPacks, checkUser } = require(appRoot + "src/utils/db/queries");
const { insertCard, removePack } = require(appRoot + 'src/utils/db/manips')
const { randomInt, Rarity, packOpenEmbed, Packs } = require(appRoot + 'src/utils/exporter')

function rollWithPercentages(nP, rP, urP, sP) {
    const check = randomInt(0, 99) // Percentage
    var findObj = '' // Rarity to find
    // Get percentages as ranges from 0 to 100
    const normal = nP, rare = nP + rP, ultrarare = nP + rP + urP, special = nP + rP + urP + sP
    if (check >= 0 && check < normal) findObj = 'Normal'
    else if (check >= normal && check < rare) findObj = 'Rare'
    else if (check >= rare && check < ultrarare) findObj = 'Ultra Rare'
    else if (check >= ultrarare && check < special) findObj = 'Special'
    // Get rarity ID from name
    return Object.keys(Rarity).find(key => Rarity[key].tag === findObj)
}

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('open')
        .setDescription ("Open a cards pack")
        .addStringOption(option =>
          option
            .setName('pack')
            .setDescription('The pack you want to open')
            .setRequired(true)
            .addChoices(
                {name: 'Free Pack', value: '1'},
                {name: 'Special Pack', value: '2'},
                {name: 'Ultra Rare Pack', value: '3'},
                {name: 'Exclusive Pack', value: '4'},
            )
        ),
    // Main function
    async execute(interaction, cardsdb){
        const pack = interaction.options.getString('pack')
        
        // Get user information
        const user = interaction.user;
        // Get database entry and page for the user
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId['user_id'] // Bot should have already registered the user
        
        // Check if the user has the specified pack
        const packDb = await queryPacks(cardsdb, dbId)
        const index = Object.keys(packDb).find(key => packDb[key].pack_id == pack)
        const amount = index === undefined ? 0 : packDb[index].quantity
        if (amount == 0){ // User has no packs
            return await interaction.reply(`You don't have any pack of that type!`);
        }
        
        // Get pack information and show it
        const pacName = packDb[index].pack_name
        const info = await packInfo(cardsdb, pack)
        var pacEmbed = new EmbedBuilder()
            .setTitle(`${Packs[pacName].emoji} Opening a __${pacName}__...`)
            .setColor(Packs[pacName].color)

        await interaction.reply({
            embeds: [pacEmbed],
        })

        // Repeat for the amount of cards opening the pack
        for (let i = 0; i < info['card_amount']; i++){
            // Get rarity to give
            const rarity = rollWithPercentages(info['normal_percentage'], info['rare_percentage'], info['ultrarare_percentage'], info['special_percentage'])
            // Get list of all available cards and choose at random
            const cardList = await getRarityCardsList(cardsdb, rarity)
            const rand = randomInt(0, cardList.length - 1)
            const retName = cardList[rand]['card_name']
            // Inser depending on existing quantity
            const quan = await checkCardQuantity(cardsdb, dbId, retName)
            insertCard(cardsdb, dbId, retName, quan) // Only 1 card
            // Get embed and update open status
            const embed = await packOpenEmbed(cardsdb, retName, quan + 1)
            await interaction.followUp({
                embeds: [embed]
            })
        }
        return removePack(cardsdb, dbId, pacName) // All cards obtained
    }
}