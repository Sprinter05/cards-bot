const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { rarityInfo, checkMoney, countCards, checkUser, checkMissingCards, getCardCount } = require(appRoot + 'src/utils/db/queries')
var { cEmoji } = require(appRoot + 'config/properties.json');

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription ("Show a user's stats")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to look cards for.')
            .setRequired(false)  
        ),
    // Main function
    async execute(interaction, cardsdb){
        // If user is not specified use the person that ran the command
        const user = interaction.options.getUser('user') ?? interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']

        // Get all stats for the specified user
        const money = await checkMoney(cardsdb, dbId) ?? 0
        const nCards = await countCards(cardsdb, dbId, 1) ?? 0
        const rCards = await countCards(cardsdb, dbId, 2) ?? 0
        const urCards = await countCards(cardsdb, dbId, 3) ?? 0
        const sCards = await countCards(cardsdb, dbId, 4) ?? 0
        // Query all rarity information
        const nInfo = await rarityInfo(cardsdb, 1)
        const rInfo = await rarityInfo(cardsdb, 2)
        const urInfo = await rarityInfo(cardsdb, 3)
        const sInfo = await rarityInfo(cardsdb, 4)
        // Only show special cards if the user has them
        const speString = sCards === 0 ? '' : `\n${sInfo['emoji']} Special x${sCards}`
        var cString = `${nInfo['emoji']} Normal x${nCards}\n${rInfo['emoji']} Rare x${rCards}\n${urInfo['emoji']} Ultra Rare x${urCards}${speString}`

        // Get completion percentage
        const missingCards = await checkMissingCards(cardsdb, dbId)
        const missingLength = Object.keys(missingCards).length
        const cardsMax = await getCardCount(cardsdb)
        const completionPerc = 100 - Math.round(missingLength * 100 / cardsMax)

        // Create embed with information
        var embed = new EmbedBuilder()
            .setAuthor({name: `${user.username}`, iconURL: user.avatarURL()})
            .setThumbnail('https://mario.wiki.gallery/images/5/59/PMCS_Mario_Cards.png')
            .setColor('#18E6E6')
            .addFields(
                { name: '**Money:**', value: `${cEmoji} ${money}` },
                { name: '**Cards:**', value: cString },
                { name: '**Completion:**', value: `${completionPerc}% cards obtained` },
            )
            .setFooter({text: `Cards-Bot`, iconURL: interaction.client.user.avatarURL()})

        await interaction.reply({
            embeds: [embed],
        })
    }
}