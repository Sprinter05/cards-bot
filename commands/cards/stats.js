const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { checkMoney, countCards, checkUser } = require('../../utils/queries.js')
var { rarEmojis, cEmoji } = require('../../properties.json')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription ("Show a user's stats")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to look cards for.')
            .setRequired(false)  
        ),
    // Main function
    async execute(interaction, cardsdb){
        const user = interaction.options.getUser('user') ?? interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId.length === 0 ? -1 : queryId[0]['user_id']

        const money = await checkMoney(cardsdb, dbId)
        const nCards = await countCards(cardsdb, dbId, 1)
        const rCards = await countCards(cardsdb, dbId, 2)
        const urCards = await countCards(cardsdb, dbId, 3)
        const sCards = await countCards(cardsdb, dbId, 4)
        const speString = sCards === 0 ? '' : `\n${rarEmojis.sCard} Special x${sCards}`
        var cString = `${rarEmojis.nCard} Normal x${nCards}\n${rarEmojis.rCard} Rare x${rCards}\n${rarEmojis.urCard} Ultra Rare x${urCards}${speString}`

        var embed = new EmbedBuilder()
            .setAuthor({name: `${user.username}`, iconURL: user.avatarURL()})
            .setThumbnail('https://mario.wiki.gallery/images/5/59/PMCS_Mario_Cards.png')
            .setColor('#18E6E6')
            .addFields(
                { name: '**Money:**', value: `${cEmoji} ${money}` },
                { name: '**Cards:**', value: cString },
            )
            .setFooter({text: `Cards-Bot`, iconURL: interaction.client.user.avatarURL()})

        await interaction.reply({
            embeds: [embed],
        })
    }
}