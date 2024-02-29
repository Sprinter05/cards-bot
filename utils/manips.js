const { QueryTypes } = require('sequelize');
const { entries } = require('../properties.json')

exports.logUser = async function(database, id){
    const insertUser = await database.query(
        `INSERT INTO users(discord_id) VALUES (${id});`,
        {type: QueryTypes.INSERT}
    );
    console.log(`[+] NEW REGISTER userID ${insertUser[0]} discordID ${id}`)
    return insertUser;
}

exports.deleteCard = async function(database, id, card){
    const delQuery = await database.query(
        `DELETE FROM user_cards NATURAL JOIN cards WHERE user_id=${id} AND card_name='${card}' LIMIT 1;`,
        {type: QueryTypes.DELETE}
    );
    console.log(delQuery)
}