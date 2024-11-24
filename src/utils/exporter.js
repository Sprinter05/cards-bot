var { countCards, queryCards, queryPacks, getCardData, packInfo, rarityInfo } = require(appRoot + 'src/utils/db/queries')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { entries } = require(appRoot + 'config/properties.json')

// Create a random integer between 2 values (both included)
exports.randomInt = function(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}  

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
exports.cardRow = function(page, maxPage){
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

// Create an embed for the card that is obtained in a pack opening
exports.packOpenEmbed = async function(db, card, amount){
    const data = await getCardData(db, card, false)
    const info = await rarityInfo(db, data['card_rarity_id'])
    const cardColor = info['color']
    const cardIcon = info['icon']
    const strCard = amount == 1 ? `First copy of this card!` : `You now have ${amount} copies of this card.`
    var embed = new EmbedBuilder()
        .setTitle(`You just got a __${data['card_name']}__!`)
        .setDescription(strCard)
        .setImage(data['card_img_url'])
        .setColor(cardColor)
        .setFooter({ text: `ID: ${data['card_id']}` , iconURL: cardIcon})
    return embed
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
    for(let i = 0; i <= Object.keys(outputQuery).length-1; i++){
        // Get the card rarity
        const info = await rarityInfo(db, outputQuery[i].card_rarity_id)
        let rarityEmoji = info['emoji']
        let countCard = '' // Card amount
        if (outputQuery[i].quantity !== 1) {countCard = `x${outputQuery[i].quantity}`}
        // Append to string
        outputStr += `${rarityEmoji} ${outputQuery[i].card_name} ${countCard}\n`
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
    for(let i = 0; i <= Object.keys(outputQuery).length-1; i++){
        // Get emoji
        const info = await packInfo(db, outputQuery[i].pack_id);  
        let packEmoji = info['emoji']
        // Append to string
        outputStr += `${packEmoji} ${outputQuery[i].pack_name} x${outputQuery[i].quantity}\n`
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