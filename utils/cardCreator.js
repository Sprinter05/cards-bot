var { countCards, queryCards } = require('./queries.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { entries } = require('../config.json')

exports.cardsMaxPage = async function(db, uID){
    var totalEntries = await countCards(db, uID)
    var maxPage = 1;
    if (totalEntries % entries == 0){maxPage = totalEntries/entries}
    else {maxPage = Math.trunc(totalEntries/entries) + 1}
    return maxPage
}

exports.cardRow = async function(page, maxPage){
    const next = new ButtonBuilder()
        .setCustomId('cardNext')
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    const prev = new ButtonBuilder()
        .setCustomId('cardPrev')
        .setEmoji("⏪")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false)
    const row = new ActionRowBuilder()
        .addComponents(prev, next);
        
    if (page <= 1) {row.components[0].setDisabled(true)}
    if (page >= maxPage) {row.components[1].setDisabled(true)}

    return row;
}

exports.cardEmbed = async function(db, uID, page){
    maxPage = await exports.cardsMaxPage(db, uID, entries)
    if (page > maxPage){page = maxPage}
    var outputQuery = await queryCards(db, uID, page)
    var embed = new EmbedBuilder()
        .setTitle("These are your cards:")
        .setDescription(outputQuery)
        .setFooter({ text: `Page ${page}` })
    return embed;
}

exports.rarityColor = async function(db, rarity){
    var color = ""
    switch(rarity){
        case 1:
            color = "#8F8D8E"
            break;
        case 2:
            color = "#F29658"
            break;
        case 3:
            color = "#DB757B"
            break;
        case 4:
            color = "#F2CF44"
            break;
        default:
            color = "#FFFFFF"
            break;
    }
    return color;
}