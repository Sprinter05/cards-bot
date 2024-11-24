const { QueryTypes } = require('sequelize');
const { entries } = require(appRoot + 'config/properties.json');

//! Queries shoule never use SELECT *

// Get the amount of existing cards
exports.getCardCount = async function(database){
    const countCards = await database.query(
        `SELECT COUNT(card_id) from cards;`,
        {type: QueryTypes.SELECT, plain: true}
    );
    return countCards['COUNT(card_id)']
}

// Get the amount of existing packs
exports.getPackCount = async function(database){
    const countPacks = await database.query(
        `SELECT COUNT(pack_id) from packs;`,
        {type: QueryTypes.SELECT, plain: true}
    );
    return countPacks['COUNT(pack_id)']
}

// Checks if a user exists in the database
exports.checkUser = async function(database, discordId){
    const userExist = await database.query(
        `SELECT user_id FROM users WHERE discord_id = ?;`,
        {replacements: [discordId], type: QueryTypes.SELECT, plain: true}
    );
    return userExist
}

// Returns Epoch timestamp of free pack cooldown
exports.getFreePackCooldown = async function(database, id){
    const stamp = await database.query(
        `SELECT unix_stamp FROM user_cooldowns WHERE user_id = ? AND pack_id = 1`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    )
    return stamp['unix_stamp'];
}

// Return the amount of money the user has
exports.checkMoney = async function(database, id){
    const money = await database.query(
        `SELECT coins FROM users WHERE user_id = ?`,
        {replacements: [id], type: QueryTypes.SELECT, plain: true}
    )
    return money == null ? 0 : money['coins']
}

// Gets the amount of packs a user has (by name)
exports.checkPackQuantity = async function(database, id, pack){
    const pacQuan = await database.query(
        `SELECT quantity FROM user_packs NATURAL JOIN packs WHERE pack_name = ? AND user_id = ?;`,
        {replacements: [pack, id], type: QueryTypes.SELECT, plain: true}
    );
    return pacQuan === null ? 0 : pacQuan['quantity']
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
        `SELECT pack_name, card_amount, price, normal_percentage, rare_percentage, ultrarare_percentage, special_percentage, color, icon, emoji FROM packs WHERE pack_id = ?;`,
        {replacements: [pId], type: QueryTypes.SELECT, plain: true}
    )
    return packData
}

// Get all information about a rarity (mainly assets)
exports.rarityInfo = async function(database, rId){
    const rarityData = database.query(
        `SELECT color, icon, emoji FROM cards_rarity WHERE card_rarity_id = ?;`,
        {replacements: [rId], type: QueryTypes.SELECT, plain: true}
    )
    return rarityData
}

// Query cards by n entries depending on the page
exports.queryCards = async function(database, id, page) {
    const offset = (page-1) * entries // Offset is where it starts 
    const userCards = await database.query(
        `SELECT card_name, card_rarity_id, quantity FROM user_cards NATURAL JOIN cards WHERE user_id = ? LIMIT ? OFFSET ?;`,
        {replacements: [id, entries, offset], type: QueryTypes.SELECT}
    );
    return userCards;
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
exports.getCardData = async function(database, card, useId){
    var cardInfo;
    if (useId == false){
        cardInfo = await database.query(
            `SELECT card_id, card_name, card_rarity_id, card_img_url FROM cards WHERE card_name = ?;`,
            {replacements: [card], type: QueryTypes.SELECT, plain: true}
        )
    } else {
        cardInfo = await database.query(
            `SELECT card_id, card_name, card_rarity_id, card_img_url FROM cards WHERE card_id = ?;`,
            {replacements: [card], type: QueryTypes.SELECT, plain: true}
        )
    }
    return cardInfo;
}

// Get all cards of a certain rarity
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
    return ownCheck === null ? false : true
}

// Get all missing cards for a user
exports.checkMissingCards = async function(database, id){
    const missing = await database.query(
        `SELECT card_name FROM cards WHERE card_id NOT IN (SELECT card_id FROM user_cards WHERE user_id = ?);`,
        {replacements: [id], type: QueryTypes.SELECT}
    )
    return missing
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
    return userPacks;
}