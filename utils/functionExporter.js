var { countCards, queryCards, queryPacks } = require('./queries.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { entries, rarColors, rarEmojis, rarIcons, pacEmojis } = require('../properties.json')

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

exports.cardEmbed = async function(db, dbId, titleUser, userIcon, page){
    maxPage = await exports.cardsMaxPage(db, dbId, entries)
    if (page > maxPage){page = maxPage}
    var outputQuery = await queryCards(db, dbId, page)
    var outputStr = ''
    for(let i = 0; i<= Object.keys(outputQuery).length-1; i++){
        let rarityEmoji = exports.rarityRequest(outputQuery[`${i}`].rarity, 'emoji')
        let countCard = ''
        if (outputQuery[`${i}`].count !== 1) {countCard = `x${outputQuery[`${i}`].count}`}
        outputStr += `${rarityEmoji} ${outputQuery[`${i}`].name} ${countCard}\n`
    }
    const title = titleUser === 0 ? `These are your cards:` : `These are ${titleUser}'s cards:`
    var embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(outputStr)
        .setColor('#18E6E6')
        .setFooter({ text: `Page ${page}`, iconURL: userIcon})
    return embed;
}

exports.packEmbed = async function(db, titleUser, uID){
    var outputQuery = await queryPacks(db, uID)
    var outputStr = ''
    for(let i = 0; i<= Object.keys(outputQuery).length-1; i++){
        let packEmoji = '' 
        switch(outputQuery[`${i}`].name){
            case 'Free Pack':
                packEmoji = pacEmojis.fPack
                break;
            case 'Special Pack':
                packEmoji = pacEmojis.sPack
                break;
            case 'Ultra Rare Pack':
                packEmoji = pacEmojis.urPack
                break;
            case 'Exclusive Pack':
                packEmoji = pacEmojis.ePack
                break;
            default:
                packEmoji = ''
                break;
        }
        outputStr += `${packEmoji} ${outputQuery[`${i}`].name} x${outputQuery[`${i}`].count}\n`
    }
    const title = titleUser === 0 ? `These are your packs:` : `These are ${titleUser}'s packs:`
    var embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(outputStr)
        .setColor('#18E6E6')
    return embed;
}

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

exports.rarityRequest = function(rarity, request){
    var retValue
    switch(rarity){
        case 1:
            switch(request){
                case 'color':
                    retValue = rarColors.nCard
                    break;
                case 'emoji':
                    retValue = rarEmojis.nCard
                    break;
                case 'iconURL':
                    retValue = rarIcons.nCard
                    break;
                default:
                    retValue = 'Normal'
                    break;
            }
            break;
        case 2:
            switch(request){
                case 'color':
                    retValue = rarColors.rCard
                    break;
                case 'emoji':
                    retValue = rarEmojis.rCard
                    break;
                case 'iconURL':
                    retValue = rarIcons.rCard
                    break;
                default:
                    retValue = 'Rare'
                    break;
            }
            break;
        case 3:
            switch(request){
                case 'color':
                    retValue = rarColors.urCard
                    break;
                case 'emoji':
                    retValue = rarEmojis.urCard
                    break;
                case 'iconURL':
                    retValue = rarIcons.urCard
                    break;
                default:
                    retValue = 'Ultra Rare'
                    break;
            }
            break;
        case 4:
            switch(request){
                case 'color':
                    retValue = rarColors.sCard
                    break;
                case 'emoji':
                    retValue = rarEmojis.sCard
                    break;
                case 'iconURL':
                    retValue = rarIcons.sCard
                    break;
                default:
                    retValue = 'Special'
                    break;
            }
            break;
        default:
            retValue = ''
            break;
    }
    return retValue;
}