const { QueryTypes } = require('sequelize');
const { entries } = require(appRoot + 'config/properties.json');

//! Queries shoule never use SELECT *

// Checks if a user exists in the database
exports.checkUser = async function(database, discordId){
    const userExist = await database.query(
        `SELECT user_id FROM users WHERE discord_id = ?;`,
        {replacements: [discordId], type: QueryTypes.SELECT, plain: true}
    );
    return userExist
}

// Return the amount of money the user has
exports.checkMoney = async function(database, id){
    const money = await database.query(
        `SELECT coins FROM users WHERE user_id = ?`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    )
    return money == null ? 0 : money['coins']
}

// Gets the amount a user has of a specific card
exports.checkCardQuantity = async function(database, id, card){
    const queryQuantity = await database.query(
        `SELECT quantity FROM user_cards NATURAL JOIN cards WHERE card_name = ? AND user_id = ?;`,
        {replacements: [card, id], type: QueryTypes.SELECT, plain: true}
    );
    return queryQuantity === null ? 0 : queryQuantity['quantity']
}

// Counts the amount of cards a user has (this is used to check if it has no cards) 
exports.countCards = async function(database, id, rarity){
    var countCards = 0;
    // Rarity is optional so if undefined we just get all values
    if (rarity === undefined){
        countCards = await database.query(
            `SELECT COUNT(card_id) AS result FROM user_cards NATURAL JOIN cards WHERE user_id = ?;`,
            {replacements: [id], type: QueryTypes.SELECT, plain: true}
        );
    } else { // Get amount by rarity
        countCards = await database.query(
            `SELECT SUM(quantity) AS result FROM user_cards NATURAL JOIN cards WHERE card_rarity_id = ? AND user_id = ?;`,
            {replacements: [rarity, id], type: QueryTypes.SELECT, plain: true}
        );
    }
    return countCards['result'];
}

// Query all info about a pack, including percentages
exports.packInfo = async function(database, pId){
    const packData = database.query(
        `SELECT card_amount, price, normal_percentage, rare_percentage, ultrarare_percentage, special_percentage FROM packs WHERE pack_id = ?;`,
        {replacements: [pId], type: QueryTypes.SELECT, plain: true}
    )
    return packData
}

// Query cards by n entries depending on the page
exports.queryCards = async function(database, id, page) {
    const offset = (page-1) * entries // Offset is where it starts 
    const userCards = await database.query(
        `SELECT card_name, card_rarity_id, quantity FROM user_cards NATURAL JOIN cards WHERE user_id = ? LIMIT ? OFFSET ?;`,
        {replacements: [id, entries, offset], type: QueryTypes.SELECT}
    );
    // ? Put all cards into a JSON object
    var outputJson = {};
    for(var i = 0; i < userCards.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userCards[i]['card_name']
        outputJson[`${i}`].rarity = userCards[i]['card_rarity_id']
        outputJson[`${i}`].count = userCards[i]['quantity']
    }
    return outputJson;
}

// Checks if a user has a single card or more
exports.checkDupes = async function(database, id) {
    const userDupes = await database.query(
        `SELECT quantity FROM user_cards WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT}
    );
    // We count the length and check if its higher than 1
    for(var i = 0; i < userDupes.length; i++){
        if (userDupes[i]['quantity'] > 1) return true;
    }
    return false;
}

// Get all data about a card
exports.getCardData = async function(database, card){
    const cardInfo = await database.query(
        `SELECT card_id, card_name, card_rarity_id, card_img_url FROM cards WHERE card_name = ?;`,
        {replacements: [card], type: QueryTypes.SELECT, plain: true}
    )
    return cardInfo;
}

exports.getRarityCardsList = async function(database, rarity){
    const cards = await database.query(
        `SELECT card_name FROM cards WHERE card_rarity_id = ?`,
        {replacements: [rarity], type: QueryTypes.SELECT}
    )
    return cards;
}

// Used for the card choosing in trades, gets all cards a user has by name
exports.getAllCards = async function(database, id){
    const cards = await database.query(
        `SELECT card_name FROM user_cards NATURAL JOIN cards WHERE user_id = ?`,
        {replacements: [id], type: QueryTypes.SELECT}
    )
    return cards;
}

// Checks if a user owns a card by checking for null query
exports.checkCardOwn = async function(database, id, cardId){
    const ownCheck = await database.query(
        `SELECT card_id FROM user_cards WHERE card_id = ? AND user_id = ?;`,
        {replacements: [cardId, id], type: QueryTypes.SELECT, plain: true}
    )
    if (ownCheck === null){
        return false
    } else {return true}
}

// Counts the amount of packs a user has (this is to check if it has no packs)
exports.countPacks = async function(database, id){
    const countPacks = await database.query(
        `SELECT SUM(quantity) AS result FROM user_packs WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    );
    return countPacks['result'];
}

// Get all packs a user has
exports.queryPacks = async function(database, id){
    const userPacks = await database.query(
        `SELECT pack_name, pack_id, quantity FROM user_packs NATURAL JOIN packs WHERE user_id = ?;`,
        {replacements: [id], type: QueryTypes.SELECT}
    );
    // ? Put all results into a JSON object
    var outputJson = {};
    for(var i = 0; i < userPacks.length; i++){
        outputJson[`${i}`] = {}
        outputJson[`${i}`].name = userPacks[i]['pack_name']
        outputJson[`${i}`].id = userPacks[i]['pack_id']
        outputJson[`${i}`].count = userPacks[i]['quantity']
    }
    return outputJson;
}