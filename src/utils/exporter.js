var { countCards, queryCards, queryPacks } = require('./db/queries')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { entries, rarColors, rarEmojis, rarIcons, pacEmojis } = require('../../config/properties.json')

// Object array for getting card values
const Rarity = Object.freeze({
    '1': { // Normal
        color: rarColors.nCard,
        emoji: rarEmojis.nCard,
        icons: rarIcons.nCard
    },
    '2': { // Rare
        color: rarColors.rCard,
        emoji: rarEmojis.rCard,
        icons: rarIcons.rCard
    },
    '3': { // Ultra Rare
        color: rarColors.urCard,
        emoji: rarEmojis.urCard,
        icons: rarIcons.urCard
    },
    '4': { // Special
        color: rarColors.sCard,
        emoji: rarEmojis.sCard,
        icons: rarIcons.sCard
    }
})
exports.Rarity = Rarity // For use outside

// Object array for pack emojis
const Packs = Object.freeze({
    'Free Pack': pacEmojis.fPack,
    'Special Pack': pacEmojis.sPack,
    'Ultra Rare Pack': pacEmojis.urPack,
    'Exclusive Pack': pacEmojis.ePack,
})
exports.Packs = Packs // For use outside

// Return the highest page that can be displayed
exports.cardsMaxPage = async function(db, uID){
    var totalEntries = await countCards(db, uID)
    var maxPage = 1; // Minimum pages
    // If its a module of entries its the division
    if (totalEntries % entries == 0){maxPage = totalEntries/entries}
    // Otherwise we add an extra page
    else {maxPage = Math.trunc(totalEntries/entries) + 1}
    return maxPage
}

// Set up the button row for cards command
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
    // We disable the button if we are outside of range
    if (page <= 1) {row.components[0].setDisabled(true)}
    if (page >= maxPage) {row.components[1].setDisabled(true)}
    return row;
}

// Create an embed that will display the cards
exports.cardEmbed = async function(db, dbId, titleUser, userIcon, page){
    // If the page given as argument is bigger we just send to the biggest
    maxPage = await exports.cardsMaxPage(db, dbId, entries)
    if (page > maxPage){page = maxPage}
    // Query all cards by page (only n entries)
    var outputQuery = await queryCards(db, dbId, page)
    var outputStr = ''
    // Loop through all the keys on the objects and turn them into a formatted string
    for(let i = 0; i<= Object.keys(outputQuery).length-1; i++){
        // Get the card rarity
        let rarityEmoji = exports.Rarity[outputQuery[`${i}`].rarity].emoji
        let countCard = '' // Card amount
        if (outputQuery[`${i}`].count !== 1) {countCard = `x${outputQuery[`${i}`].count}`}
        // Append to string
        outputStr += `${rarityEmoji} ${outputQuery[`${i}`].name} ${countCard}\n`
    }
    // Send formatted embed
    const title = titleUser === 0 ? `These are your cards:` : `These are ${titleUser}'s cards:`
    var embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(outputStr)
        .setColor('#18E6E6')
        .setFooter({ text: `Page ${page}`, iconURL: userIcon})
    return embed;
}

// Create an embed with all packs
exports.packEmbed = async function(db, titleUser, uID){
    // There are no pages in packs
    var outputQuery = await queryPacks(db, uID)
    var outputStr = ''
    // Loop through the object to get formatted string
    for(let i = 0; i<= Object.keys(outputQuery).length-1; i++){
        // Get emoji
        let packEmoji = Packs[outputQuery[`${i}`].name]
        // Append to string
        outputStr += `${packEmoji} ${outputQuery[`${i}`].name} x${outputQuery[`${i}`].count}\n`
    }
    // Send formatted embed
    const title = titleUser === 0 ? `These are your packs:` : `These are ${titleUser}'s packs:`
    var embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(outputStr)
        .setColor('#18E6E6')
    return embed;
}

// Create button row for trade confirm
exports.tradeConfirmRow = function(){
    const confirmBton = new ButtonBuilder()
        .setCustomId('confirmTrade')
        .setLabel('Confirm')
        .setStyle(ButtonStyle.Success);
    const cancelBton = new ButtonBuilder()
        .setCustomId('denyTrade')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger);
    const newRow = new ActionRowBuilder()
        .addComponents(confirmBton, cancelBton);
    return newRow
}

// Create embed for trade confirm
exports.tradeConfirmEmbed = function(embed, descString, cardImg){
    var newEmbed = new EmbedBuilder()
        .setTitle(`Confirm the trade ${embed.author.name.split(" ")[0]}!`)
        .setDescription(descString)
        .setColor("#18E6E6")
        .setFooter({ text: `Trade accepted!`, iconURL: embed.footer.icon_url})
        .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url})
        .setImage(cardImg)
        .setThumbnail(embed.image.url)
    return newEmbed;
}

// Create row for resetting data
exports.ddDataRow = function(){
    const confirmBton = new ButtonBuilder()
        .setCustomId('acceptReset')
        .setLabel('💣 Confirm')
        .setStyle(ButtonStyle.Danger);
    const cancelBton = new ButtonBuilder()
        .setCustomId('cancelReset')
        .setLabel('⛔ Cancel')
        .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder()
        .addComponents(confirmBton, cancelBton);
    return row
}