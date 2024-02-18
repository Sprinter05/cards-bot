var { countCards, queryCards } = require('./queries.js')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { entries } = require('../properties.json')

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
    var outputStr = ''
    var rarityEmoji = ''
    for(let i = 0; i<= Object.keys(outputQuery).length-1; i++){
        rarityEmoji = exports.rarityRequest(outputQuery[`${i}`].rarity, 'emoji')
        outputStr += `${rarityEmoji} ${outputQuery[`${i}`].name}\n`
    }
    var embed = new EmbedBuilder()
        .setTitle("These are your cards:")
        .setDescription(outputStr)
        .setFooter({ text: `Page ${page}` })
    return embed;
}

exports.rarityRequest = function(rarity, request){
    var retValue
    switch(rarity){
        case 1:
            switch(request){
                case 'color':
                    retValue = '#8F8D8E'
                    break;
                case 'emoji':
                    retValue = '<:normal_card:1208719611466616862>'
                    break;
                case 'iconURL':
                    retValue = 'https://media.discordapp.net/attachments/1208718279904985098/1208718359823122493/normal.png?ex=65e44db1&is=65d1d8b1&hm=386a6e6d2a004b453cd8df4e768017ac1c3be069fe69b85fa86aeffaad928f07'
                    break;
                default:
                    retValue = ''
                    break;
            }
            break;
        case 2:
            switch(request){
                case 'color':
                    retValue = '#F29658'
                    break;
                case 'emoji':
                    retValue = '<:rare_card:1208721050783842314>'
                    break;
                case 'iconURL':
                    retValue = 'https://media.discordapp.net/attachments/1208718279904985098/1208718370422399056/rare.png?ex=65e44db4&is=65d1d8b4&hm=e536921c8e624d764329119c0cd3928f9bf9e03111d53952dea042d883d9a70d'
                    break;
                default:
                    retValue = ''
                    break;
            }
            break;
        case 3:
            switch(request){
                case 'color':
                    retValue = '#DB757B'
                    break;
                case 'emoji':
                    retValue = '<:ultrarare_card:1208721064339701770>'
                    break;
                case 'iconURL':
                    retValue = 'https://media.discordapp.net/attachments/1208718279904985098/1208718379448275024/ultrarare.png?ex=65e44db6&is=65d1d8b6&hm=4ce37bb5dea1028374e00fce245a520de562610040b248c1c252b6c28ff4d9eb'
                    break;
                default:
                    retValue = ''
                    break;
            }
            break;
        case 4:
            switch(request){
                case 'color':
                    retValue = '#F2CF44'
                    break;
                case 'emoji':
                    retValue = '<:special_card:1208721078403338240>'
                    break;
                case 'iconURL':
                    retValue = 'https://media.discordapp.net/attachments/1208718279904985098/1208718389904674817/special.png?ex=65e44db9&is=65d1d8b9&hm=d317e061c963ec60c032f10122f8b3df5ea7f30f5476527ba64e0a88334b78a5'
                    break;
                default:
                    retValue = ''
                    break;
            }
            break;
        default:
            retValue = ''
            break;
    }
    return retValue;
}