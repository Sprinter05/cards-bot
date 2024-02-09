const { QueryTypes } = require('sequelize');
const { entries } = require('../config.json')

exports.countCards = async function(database, id){
    const countCards = await database.query(
        `SELECT COUNT(cardID) FROM userCards WHERE userID=${id};`,
        {type: QueryTypes.SELECT}
    );
    return countCards[0]['COUNT(cardID)'];
}
exports.queryCards = async function(database, id, page) {
    const offset = (page-1)*entries
    const userCards = await database.query(
        `SELECT cardName FROM userCards NATURAL JOIN cards WHERE userID=${id} LIMIT ${entries} OFFSET ${offset};`,
        {type: QueryTypes.SELECT}
    );
    var outputStr = '';
    for(var i = 0; i < userCards.length; i++){
        outputStr += `${userCards[i]['cardName']}\n`
    }
    return outputStr;
}
