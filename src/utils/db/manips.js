const { QueryTypes } = require('sequelize');
const { randomInt } = require(appRoot + 'src/utils/exporter')
const { checkCardQuantity, checkPackQuantity } = require(appRoot + "src/utils/db/queries");

// Create a new Discord user entry in the database
exports.logUser = async function(database, id){
    const tmstamp = Date.now() / 1000 // Instant Free Pack available when registrating
    const insertUser = await database.query( // Insert user info
        `INSERT INTO users(discord_id, coins) VALUES (?, 100);`,
        {replacements: [id, tmstamp], type: QueryTypes.INSERT}
    );
    const newDbId = insertUser[0]
    database.query( // Insert user info
        `INSERT INTO user_cooldowns(user_id, pack_id, unix_stamp) VALUES (?, 1, ?);`,
        {replacements: [newDbId, tmstamp], type: QueryTypes.INSERT}
    );
    return;
}

// Updates when the new Free Pack will be available
exports.newFreePackCooldown = async function(database, id){
    const stamp = Date.now() / 1000 // Current time
    const cooldown = await database.query( // Query cooldown
        `SELECT cooldown FROM packs WHERE pack_id = 1;`,
        {type: QueryTypes.SELECT, plain: true}
    );
    const newStamp = stamp + cooldown['cooldown'] // Wait x amount of time
    database.query(
        `UPDATE user_cooldowns SET unix_stamp = ? WHERE user_id = ? AND pack_id = 1;`,
        {replacements: [newStamp, id], type: QueryTypes.UPDATE}
    );
    return newStamp;
}

// Reduces 1 pack quantity on the user (performing a previous check)
exports.removePack = async function(database, id, pack){
    const amount = await checkPackQuantity(database, id, pack)
    // If the user has only one pack we delete the entry
    if (amount === 1){
        database.query(
            `DELETE FROM user_packs WHERE user_id = ? AND pack_id=(SELECT pack_id FROM packs WHERE pack_name = ?);`,
            {replacements: [id, pack], type: QueryTypes.DELETE}
        );
    } else { // Otherwise we reduce the quantity by 1
        database.query(
            `UPDATE user_packs SET quantity=quantity-1 WHERE user_id = ? AND pack_id=(SELECT pack_id FROM packs WHERE pack_name = ?);`,
            {replacements: [id, pack], type: QueryTypes.UPDATE}
        );
    }
    return;
}

// Adds a pack to a user's database (previous check performed)
exports.addPack = async function(database, id, pack, quantity){
    const amount = await checkPackQuantity(database, id, pack)
    if (amount === 0){ // Insert new pack
        database.query(
            `INSERT INTO user_packs(user_id, pack_id, quantity) VALUES (?, (SELECT pack_id FROM packs WHERE pack_name = ?), ?);`,
            {replacements: [id, pack, quantity], type: QueryTypes.INSERT}
        );
    } else { // Otherwise we increase the quantity by 1
        database.query(
            `UPDATE user_packs SET quantity=quantity + ? WHERE user_id = ? AND pack_id=(SELECT pack_id FROM packs WHERE pack_name = ?);`,
            {replacements: [quantity, id, pack], type: QueryTypes.UPDATE}
        );
    }
    return;
}

// Reduce by 1 the quantity of a user's card
exports.deleteCard = async function(database, id, card, quantity){
    // If the user has only one we delete the card entry
    if (quantity === 1){
        database.query(
            `DELETE FROM user_cards WHERE user_id = ? AND card_id=(SELECT card_id FROM cards WHERE card_name = ?);`,
            {replacements: [id, card], type: QueryTypes.DELETE}
        );
    } else { // Otherwise we reduce the quantity by 1
        database.query(
            `UPDATE user_cards SET quantity=quantity-1 WHERE user_id = ? AND card_id=(SELECT card_id FROM cards WHERE card_name = ?);`,
            {replacements: [id, card], type: QueryTypes.UPDATE}
        );
    }
    return;
}

// Add a new card to the user's database (quantity represents how many the user already has)
exports.insertCard = async function(database, id, card, quantity){
    // If the user has no cards we create the entry 
    if (quantity === 0){
        database.query(
            `INSERT INTO user_cards(user_id, card_id, quantity) VALUES (?, (SELECT card_id FROM cards WHERE card_name = ?), 1);`,
            {replacements: [id, card], type: QueryTypes.INSERT}
        );
    } else { // Otherwise we update the quantity by 1
        database.query(
            `UPDATE user_cards SET quantity=quantity+1 WHERE user_id = ? AND card_id=(SELECT card_id FROM cards WHERE card_name = ?);`,
            {replacements: [id, card], type: QueryTypes.UPDATE}
        );
    }
    return;
}

// Get some money for a repeated card
exports.scrapeCard = async function(database, id, card){
    // Get a user's card entry
    const qQuery = await database.query(
        `SELECT quantity, card_rarity_id FROM user_cards NATURAL JOIN cards WHERE card_name = ? AND user_id = ?;`,
        {replacements: [card, id], type: QueryTypes.SELECT, plain: true}
    );
    // If no card exists we error
    if(qQuery === null) return -1
    const rarity = qQuery['card_rarity_id']
    const quantity = qQuery['quantity']
    // Remove a card from the user's database
    exports.deleteCard(database, id, card, quantity)
    // Give some random money in exchange bounded by the rarity
    const scrapeQuery = await database.query(
        `SELECT scrape_min, scrape_max FROM cards_rarity WHERE card_rarity_id = ?;`,
        {replacements: [rarity], type: QueryTypes.SELECT, plain: true}
    );
    const scrapeMoney = randomInt(scrapeQuery['scrape_min'], scrapeQuery['scrape_max'])
    return scrapeMoney;
}

// Gets money for entire card collections (rarity)
exports.scrapeCollection = async function(database, id, rarity){
    // Get all cards matching a rarity
    const nQuery = await database.query(
        `SELECT card_name, quantity FROM user_cards NATURAL JOIN cards WHERE card_rarity_id = ? AND user_id = ? AND quantity>1;`,
        {replacements: [rarity, id], type: QueryTypes.SELECT}
    )
    if (nQuery.length === 0) return -1
    // Get all money to give back in exchange
    var totalMoney = 0
    for(let i = 0; i < nQuery.length; i++){
        for(let j = 0; j < (nQuery[i]['quantity']-1); j++){
            totalMoney += await exports.scrapeCard(database, id, nQuery[i]['card_name'])
        }
    }
    return totalMoney
}

// Update's a user's money
exports.updateMoney = async function(database, id, mon){
    database.query(
        `UPDATE users SET coins=coins + ? WHERE user_id = ?;`,
        {replacements: [mon, id], type: QueryTypes.UPDATE}
    )
    return;
}

// Trade a card between two users
exports.tradeCards = async function(database, id1, id2, card1, card2){
    // Query one is the one requesting trade, query two is the one we are trading with
    const qOne = await checkCardQuantity(database, id1, card1)
    const qTwo = await checkCardQuantity(database, id2, card2)
    // Delete the origin card from both users with the queried quantity
    exports.deleteCard(database, id1, card1, qOne)
    exports.deleteCard(database, id2, card2, qTwo)
    // Get the card's status for the card we are exchanging per user
    const qThree = await checkCardQuantity(database, id1, card2)
    const qFour = await checkCardQuantity(database, id2, card1)
    // Give the traded card to the user
    exports.insertCard(database, id1, card2, qThree)
    exports.insertCard(database, id2, card1, qFour)
    return;
}

// Delete all data from a user (including tables referencing it)
exports.deleteAllData = async function(database, id){
    // ? Start a transaction
    const trans = await database.transaction()
    try { // Try to delete all data
        await database.query(
            `DELETE FROM users WHERE user_id = ?;`,
            { replacements: [id], type: QueryTypes.DELETE, transaction: trans }
        )
        await trans.commit()
    } catch (e) { 
        // Rollback if there is a problem
        await trans.rollback()
    }
}