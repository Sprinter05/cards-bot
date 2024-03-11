const { QueryTypes } = require('sequelize');
const { entries } = require('../properties.json')

exports.checkUser = async function(database, discordId){
    const userExist = await database.query(
        `SELECT user_id FROM users WHERE discord_id = ?;`,
        {replacements: [discordId], type: QueryTypes.SELECT, plain: true}
    );
    return userExist
}

exports.checkMoney = async function(database, id){
    const money = await database.query(
        `SELECT coins FROM users WHERE user_id = ?`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    )
    return money['coins']
}

exports.countCards = async function(database, id, rarity){
    var countCards = 0;
    if (rarity === undefined){
        countCards = await database.query(
            `SELECT COUNT(card_id) AS result FROM user_cards NATURAL JOIN cards WHERE user_id = ?;`,
            {replacements: [id], type: QueryTypes.SELECT, plain: true}
        );
    } else {
        countCards = await database.query(
            `SELECT SUM(quantity) AS result FROM user_cards NATURAL JOIN cards WHERE card_rarity_id = ? AND user_id = ?;`,
            {replacements: [rarity, id], type: QueryTypes.SELECT, plain: true}
        );
    }
    return countCards['result'];
}

exports.queryCards = async function(database, id, page) {
    const offset = (page-1)*entries
    const userCards = await database.query(
        `SELECT card_name, card_rarity_id, quantity FROM user_cards NATURAL JOIN cards WHERE user_id = ? LIMIT ? OFFSET ?;`,
        {replacements: [id, entries, offset], type: QueryTypes.SELECT}
    );
    var outputJson = {};
    for(var i = 0; i < userCards.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userCards[i]['card_name']
        outputJson[`${i}`].rarity = userCards[i]['card_rarity_id']
        outputJson[`${i}`].count = userCards[i]['quantity']
    }
    return outputJson;
}

exports.checkDupes = async function(database, id) {
    const userDupes = await database.query(
        `SELECT quantity FROM user_cards WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT}
    );
    for(var i = 0; i < userDupes.length; i++){
        if (userDupes[i]['quantity'] > 1) return true;
    }
    return false;
}

exports.getCardData = async function(database, card){
    const cardInfo = await database.query(
        `SELECT card_id, card_name, card_rarity_id, card_img_url FROM cards WHERE card_name = ?;`,
        {replacements: [card], type: QueryTypes.SELECT, plain: true}
    )
    return cardInfo;
}

exports.checkCardOwn = async function(database, id, cardId){
    const ownCheck = await database.query(
        `SELECT card_id FROM user_cards WHERE card_id = ? AND user_id = ?;`,
        {replacements: [cardId, id], type: QueryTypes.SELECT, plain: true}
    )
    if (ownCheck === null){
        return false
    } else {return true}
}

exports.countPacks = async function(database, id){
    const countPacks = await database.query(
        `SELECT SUM(quantity) AS result FROM user_packs WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    );
    return countPacks['result'];
}

exports.queryPacks = async function(database, id){
    const userPacks = await database.query(
        `SELECT pack_name, quantity FROM user_packs NATURAL JOIN packs WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT}
    );
    var outputJson = {};
    for(var i = 0; i < userPacks.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userPacks[i]['pack_name']
        outputJson[`${i}`].count = userPacks[i]['quantity']
    }
    return outputJson;
}