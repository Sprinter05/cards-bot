const { QueryTypes } = require('sequelize');
const { entries } = require('../properties.json')

exports.countCards = async function(database, id){
    const countCards = await database.query(
        `SELECT COUNT(card_id) FROM user_cards WHERE user_id=${id};`,
        {type: QueryTypes.SELECT}
    );
    return countCards[0]['COUNT(card_id)'];
}

exports.queryCards = async function(database, id, page) {
    const offset = (page-1)*entries
    const userCards = await database.query(
        `SELECT card_name, card_rarity_id, COUNT(card_id) FROM user_cards NATURAL JOIN cards WHERE user_id=${id} GROUP BY card_id LIMIT ${entries} OFFSET ${offset};`,
        {type: QueryTypes.SELECT}
    );
    var outputJson = {};
    for(var i = 0; i < userCards.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userCards[i]['card_name']
        outputJson[`${i}`].rarity = userCards[i]['card_rarity_id']
        outputJson[`${i}`].count = userCards[i]['COUNT(card_id)']
    }
    return outputJson;
}

exports.getCardData = async function(database, card){
    const cardInfo = await database.query(
        `SELECT card_id, card_name, card_rarity_id, card_img_url FROM cards WHERE card_name="${card}";`,
        {type: QueryTypes.SELECT}
    )
    return cardInfo;
}

exports.checkCardOwn = async function(database, id, cardId){
    const ownCheck = await database.query(
        `SELECT card_id FROM user_cards WHERE card_id="${cardId}" AND user_id=${id};`,
        {type: QueryTypes.SELECT}
    )
    if (ownCheck.length === 0){
        return false
    } else {return true}
}

exports.countPacks = async function(database, id){
    const countPacks = await database.query(
        `SELECT COUNT(pack_id) FROM user_packs WHERE user_id=${id};`,
        {type: QueryTypes.SELECT}
    );
    return countPacks[0]['COUNT(pack_id)'];
}

exports.queryPacks = async function(database, id){
    const userPacks = await database.query(
        `SELECT pack_name, COUNT(pack_id) FROM user_packs NATURAL JOIN packs WHERE user_id=${id} GROUP BY pack_id;`,
        {type: QueryTypes.SELECT}
    );
    var outputJson = {};
    for(var i = 0; i < userPacks.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userPacks[i]['pack_name']
        outputJson[`${i}`].count = userPacks[i]['COUNT(pack_id)']
    }
    return outputJson;
}