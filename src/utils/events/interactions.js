const { Events, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var { checkUser, getAllCards, getCardData } = require(appRoot + 'src/utils/db/queries')
var { tradeCards, deleteAllData } = require(appRoot + 'src/utils/db/manips')
var { ddDataRow, cardEmbed, cardsMaxPage, cardRow, Rarity, tradeConfirmEmbed, tradeConfirmRow } = require(appRoot + 'src/utils/exporter');

// Used for card page next and previous
async function handleCardMove(interaction, db) {
    // Handle interaction sent by the wrong person
    if (interaction.user.id !== interaction.message.interaction.user.id){
        await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
        return;
    }

    // Get user information
    var currEmbed = interaction.message.embeds[0].data
    // uID is the person running the command, userID is the target user
    const uId = interaction.user.id
    const userId = currEmbed.footer.icon_url.split("/")[4]
    // To check what user to index
    const chkDbId = (await checkUser(db, uId))['user_id']
    const dbId = (await checkUser(db, userId))['user_id']

    // Go back or next
    var offset = 0;
    if(interaction.customId === 'cardNext'){offset = 1}
    else if(interaction.customId === 'cardPrev'){offset = -1}

    // Get embed parameters
    const msgTitle = dbId === chkDbId ? 0 : currEmbed.title.replace('These are ', '').replace(`'s cards:`, '')
    const page = parseInt(currEmbed.footer.text.replace('Page ',''))+offset
    const maxPage = await cardsMaxPage(db, dbId)

    // Create row and embed body
    var newEmbed = await cardEmbed(db, dbId, msgTitle, currEmbed.footer.icon_url, page)
    var newRow = cardRow(page, maxPage)
    
    // Prevent SQL error by going out of range
    if (page <= 1) {newRow.components[0].setDisabled(true)}
    if (page >= maxPage) {newRow.components[1].setDisabled(true)}

    // Update cards listed
    await interaction.update({
        embeds: [newEmbed],
        components: [newRow],
    })
}

// Used to accept a trade from a user
async function handleAcceptTrade(interaction, db){
    var embed = interaction.message.embeds[0].data
    // Here sent is who sent the request and req is the requested person
    const reqId = embed.footer.icon_url.split("/")[4]
    const sentId = embed.author.icon_url.split("/")[4]
    // Prevent accepting a request that is not for you
    if (interaction.user.id !== reqId) {
        await interaction.reply({ content: "This trade request is not for you!", ephemeral: true });
        return;
    }

    // Handle the card that the user who requested wants
    if(embed.fields[1].value !== 'None'){
        // Card og is the sender and trade is the requested
        const ogCard = embed.fields[0].value
        const tradeCard = embed.fields[1].value
        // Get embed parameters and update trade status
        const embedStr = `${ogCard} ⇔ ${tradeCard}`
        const cardNoEmoji =tradeCard.replace(tradeCard.split(" ")[0], '').replace(" ", '')
        const infoCard = await getCardData(db, cardNoEmoji)
        const redirectEmbed = tradeConfirmEmbed(embed, embedStr, infoCard['card_img_url'])
        const redirectRow = tradeConfirmRow()
        // Update trade status
        interaction.update({
            embeds: [redirectEmbed],
            components: [redirectRow],
        })
        return
    }

    // Otherwise make a menu for the user to choose the card to trade
    const reqDbId = (await checkUser(db, reqId))['user_id']
    const cardJSON = await getAllCards(db, reqDbId)
    var cardSels = [];
    // Discord API limit (25 elements)
    const rounds = Math.ceil(cardJSON.length / 25)
    // Adding each card the user has
    for (let j = 1; j <= rounds; j++){
        let cardSelect = new StringSelectMenuBuilder()
            .setCustomId(`cardChoose${j}`)
            .setPlaceholder('Choose a card!')
        let thresh = cardJSON.length < j * 25 ? cardJSON.length : j * 25
        for(let i = (j-1) * 25; i < thresh; i++){
            cardSelect.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(cardJSON[i]['card_name'])
                .setValue(cardJSON[i]['card_name']),
            )
        }
        cardSels.push(cardSelect)
    }

    // Embed buttons, rows and body
    const cancelBton = new ButtonBuilder()
        .setCustomId('denyTrade')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Danger);
    var compArr = []
    for (let j = 0; j < rounds; j++){
        let row = new ActionRowBuilder()
            .addComponents(cardSels[j]);
        compArr.push(row)
    }
    const btonRow = new ActionRowBuilder()
        .addComponents(cancelBton);
    compArr.push(btonRow)
    var newEmbed = new EmbedBuilder()
        .setTitle(`Choose a card ${interaction.user.username}!`)
        .setColor('277F4A')
        .setDescription(`Trading for ${embed.fields[0].value}`)
        .setFooter({ text: `Trade accepted!` , iconURL: interaction.user.avatarURL()})
        .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url})
        .setImage(embed.image.url)

    // Update trade status
    await interaction.update({
        embeds: [newEmbed],
        components: compArr,
    });
}

// Used to confirm a trade and update database
async function handleConfirmTrade(interaction, db){
    var embed = interaction.message.embeds[0].data
    // Here sent is who sent the request and req is the requested person
    const reqId = embed.footer.icon_url.split("/")[4]
    const sentId = embed.author.icon_url.split("/")[4]
    // Handle incorrect user
    if (interaction.user.id !== sentId) {
        await interaction.reply({ content: "You are not the user that has to confirm this trade!", ephemeral: true });
        return;
    }

    // Database 1 is the person requesting and Database 2 is the person requested
    const dbOne = (await checkUser(db, sentId))['user_id']
    const dbTwo = (await checkUser(db, reqId))['user_id']
    const cards = embed.description.split(" ⇔ ")
    const cardOne = cards[0].replace(cards[0].split(" ")[0], '').replace(" ", '')
    const cardTwo = cards[1].replace(cards[1].split(" ")[0], '').replace(" ", '')
    tradeCards(db, dbOne, dbTwo, cardOne, cardTwo) // Apply DB changes

    // Update trade status
    embed.footer.text = `Trade completed!`
    await interaction.update({
        embeds: [embed],
        components: []
    })
    // End trade
    await interaction.followUp("Trade has been completed, please check that you both have the corresponding cards!")
}

// Cancels a trade that the user requested denied
async function handleDenyTrade(interaction, db){
    var embed = interaction.message.embeds[0].data
    // Here sent is who sent the request and req is the requested person
    const reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
    const sentId = interaction.message.embeds[0].data.author.icon_url.split("/")[4]
    embed.footer.text = `Trade cancelled by ${interaction.user.username}`

    // Cannot deny a trade not directed at you
    if (interaction.user.id !== reqId && interaction.user.id !== sentId) {
        await interaction.reply({ content: "You cannot cancel a trade that you are not part of!", ephemeral: true });
        return;
    }

    // Update trade status
    await interaction.update({
        embeds: [embed],
        components: []
    })
    // End trade
    await interaction.followUp("Trade has been cancelled!")
}

// Used to choose a card if the trade sender did not request any
async function handleCardSelectorTrade(interaction, db){
    // Get user who the trade is directed to
    const reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
    // Prevent someone else from choosing a card in their behalf
    if (interaction.user.id !== reqId){
        await interaction.reply({ content: "You cannot interact with a trade that is not directed to you!", ephemeral: true });
        return;
    }

    // Value has been chosen so we query database
    const givenCard = interaction.values[0]
    const queryCard = await getCardData(db, givenCard)
    // Create embed
    var embed = interaction.message.embeds[0].data
    const cardStr = embed.description.replace("Trading for ", '')
    const ogCard = cardStr.replace(cardStr.split(" ")[0], '').replace(" ", '')
    const ogCardEmoji = cardStr.split(" ")[0]
    const tradeCardEmoji = Rarity[queryCard['card_rarity_id']].emoji
    const embedString = `${ogCardEmoji} ${ogCard} ⇔ ${tradeCardEmoji} ${givenCard}`

    // You cannot trade the same card for the same card
    if (givenCard === ogCard){
        await interaction.reply({ content: "You cannot offer the same card that you would get!", ephemeral: true })
        return
    }

    // Create the confirmation embed
    const newEmbed = tradeConfirmEmbed(embed, embedString, queryCard['card_img_url'])
    const newRow = tradeConfirmRow()
    // Update trade status
    interaction.update({
        embeds: [newEmbed],
        components: [newRow],
    })
}

// Used to cancel a data reset
async function handleCancelDataReset(interaction, db){
    // Make sure someone else does not cancel your reset
    if (interaction.user.id !== interaction.message.interaction.user.id){
        await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
        return;
    }

    // Update reset status
    await interaction.update({
        components: []
    })
    // End reset
    await interaction.followUp("Data deletion has been cancelled!")
}

// Used to confirm a data reset
async function handleConfirmDataReset(interaction, db){
    // Make sure someone else does not delete your data
    if (interaction.user.id !== interaction.message.interaction.user.id){
        await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
        return;
    }

    // Get user's database
    const userId = interaction.user.id
    const dbId = (await checkUser(db, userId))['user_id']
    var chkEmbed = interaction.message.embeds[0].data
    // User has already been warned once
    if (chkEmbed.description.includes("FINAL WARNING")) {
        deleteAllData(db, dbId) // Delete database entry for the user
        // Update reset status
        await interaction.update({components: []})
        // End reset
        return await interaction.followUp("All your data has been reset.")
    }
    
    // Create warning for the user
    const newRow = ddDataRow()
    var newEmbed = new EmbedBuilder()
        .setDescription("💣 **FINAL WARNING:**\nAre you absolutely sure you want to delete all your data? You will NOT be able to recover it.")
        .setColor("#EB0E0E")
    // Update reset status
    await interaction.update({
        embeds: [newEmbed],
        components: [newRow]
    })
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, db) {
        if (interaction.isButton()){
            // Handle the different existing buttons
            switch(interaction.customId){
                case('cardPrev'): case('cardNext'): {
                    await handleCardMove(interaction, db); break;
                } case('acceptTrade'):{
                    await handleAcceptTrade(interaction, db); break;
                } case('confirmTrade'): {
                    await handleConfirmTrade(interaction,db); break;
                } case('denyTrade'): {
                    await handleDenyTrade(interaction, db); break;
                } case('cancelReset'): {
                    await handleCancelDataReset(interaction, db); break;
                } case('acceptReset'): {
                    await handleConfirmDataReset(interaction, db); break;
                } default: return; 
            }
        } else if (interaction.isStringSelectMenu()){
            // Switch case with the string selects bc API limit
            switch(interaction.customId){
                case('cardChoose1'): case('cardChoose2'): case('cardChoose3'): {
                    await handleCardSelectorTrade(interaction, db); break;
                } default: return;
            }
        } else return // Any other interaction must not do anything
    }
};
