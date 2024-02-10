const { QueryTypes } = require('sequelize');
const { entries } = require('../config.json')

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
        `SELECT card_name FROM user_cards NATURAL JOIN cards WHERE user_id=${id} LIMIT ${entries} OFFSET ${offset};`,
        {type: QueryTypes.SELECT}
    );
    var outputStr = '';
    for(var i = 0; i < userCards.length; i++){
        outputStr += `${userCards[i]['card_name']}\n`
    }
    return outputStr;
}
