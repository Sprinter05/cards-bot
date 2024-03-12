const { QueryTypes } = require('sequelize');
const { scrapes } = require('../properties.json')

exports.randomInt = function(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}  

exports.logUser = async function(database, id){
    const insertUser = await database.query(
        `INSERT INTO users(discord_id, coins) VALUES (?, 100);`,
        {replacements: [id], type: QueryTypes.INSERT}
    );
    return insertUser;
}

exports.scrapeCard = async function(database, id, card){
    const qQuery = await database.query(
        `SELECT quantity, card_rarity_id FROM user_cards NATURAL JOIN cards WHERE card_name = ? AND user_id = ?;`,
        {replacements: [card, id], type: QueryTypes.SELECT, plain: true}
    );
    if(qQuery === null) return -1
    const rarity = qQuery['card_rarity_id']
    const quantity = qQuery['quantity']
    if (quantity === 1){
        await database.query(
            `DELETE FROM user_cards WHERE user_id = ? AND card_id=(SELECT card_id FROM cards WHERE card_name = ?);`,
            {replacements: [id, card], type: QueryTypes.DELETE}
        );
    } else {
        await database.query(
            `UPDATE user_cards SET quantity=quantity-1 WHERE user_id = ? AND card_id=(SELECT card_id FROM cards WHERE card_name = ?);`,
            {replacements: [id, card], type: QueryTypes.UPDATE}
        );
    }
    const scrapeMoney = exports.randomInt(scrapes[`${rarity}`].min, scrapes[`${rarity}`].max)
    return scrapeMoney;
}

exports.scrapeCollection = async function(database, id, rarity){
    const nQuery = await database.query(
        `SELECT card_name, quantity FROM user_cards NATURAL JOIN cards WHERE card_rarity_id = ? AND user_id = ? AND quantity>1;`,
        {replacements: [rarity, id], type: QueryTypes.SELECT}
    )
    if (nQuery.length === 0) return -1
    var totalMoney = 0
    for(let i=0; i<nQuery.length; i++){
        for(let j=0; j<(nQuery[i]['quantity']-1); j++){
            totalMoney += await exports.scrapeCard(database, id, nQuery[i]['card_name'])
        }
    }
    return totalMoney
}

exports.updateMoney = async function(database, id, mon){
    const moreMon = await database.query(
        `UPDATE users SET coins=coins + ? WHERE user_id = ?;`,
        {replacements: [mon, id], type: QueryTypes.UPDATE}
    )
    return moreMon;
}