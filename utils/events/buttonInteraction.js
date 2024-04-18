const { Events, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var { checkUser, getAllCards, getCardData } = require('../queries')
var { tradeCards, deleteAllData } = require('../manips')
var { ddDataRow, cardEmbed, cardsMaxPage, cardRow, rarityRequest, tradeConfirmEmbed, tradeConfirmRow } = require('../functionExporter');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, db) {
	    if (interaction.isButton()) {
            switch(interaction.customId){
            case('cardPrev'): case('cardNext'): {
                if (interaction.user.id !== interaction.message.interaction.user.id){
                    await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
                    return;
                }

                var currEmbed = interaction.message.embeds[0].data
                const uId = interaction.user.id
                const chkDbId = (await checkUser(db, uId))['user_id']
                const userId = currEmbed.footer.icon_url.split("/")[4]
                const dbId = (await checkUser(db, userId))['user_id']
                
                var offset = 0;
                if(interaction.customId === 'cardNext'){offset = 1}
                else if(interaction.customId === 'cardPrev'){offset = -1}

                const msgTitle = dbId === chkDbId ? 0 : currEmbed.title.replace('These are ', '').replace(`'s cards:`, '')
                const page = parseInt(currEmbed.footer.text.replace('Page ',''))+offset
                const maxPage = await cardsMaxPage(db, dbId)
                
                var newEmbed = await cardEmbed(db, dbId, msgTitle, currEmbed.footer.icon_url, page)
                var newRow = await cardRow(page, maxPage)

                // MariaDB moment
                if (page <= 1) {newRow.components[0].setDisabled(true)}
                if (page >= maxPage) {newRow.components[1].setDisabled(true)}

                await interaction.update({
                    embeds: [newEmbed],
                    components: [newRow],
                })
                break;
            } case('acceptTrade'):{
                var embed = interaction.message.embeds[0].data
                const reqId = embed.footer.icon_url.split("/")[4]
                const sentId = embed.author.icon_url.split("/")[4]
                if (interaction.user.id !== reqId) {
                    await interaction.reply({ content: "You cannot accept your own trade request!", ephemeral: true });
                    return;
                }
                if(embed.fields[1].value !== 'None'){
                    const ogCard = embed.fields[0].value
                    const tradeCard = embed.fields[1].value
                    const embedStr = `${ogCard} ⇔ ${tradeCard}`
                    const cardNoEmoji =tradeCard.replace(tradeCard.split(" ")[0], '').replace(" ", '')
                    const infoCard = await getCardData(db, cardNoEmoji)
                    const redirectEmbed = tradeConfirmEmbed(embed, embedStr, infoCard['card_img_url'])
                    const redirectRow = tradeConfirmRow()

                    interaction.update({
                        embeds: [redirectEmbed],
                        components: [redirectRow],
                    })
                    return
                }

                const reqDbId = (await checkUser(db, reqId))['user_id']
                const cardJSON = await getAllCards(db, reqDbId)
                const cardSelect = new StringSelectMenuBuilder()
			        .setCustomId('cardChoose')
			        .setPlaceholder('Choose a card!')
                for(let i=0; i<cardJSON.length; i++){
                    cardSelect.addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel(cardJSON[i]['card_name'])
                            .setValue(cardJSON[i]['card_name']),
                    )
                }
                const cancelBton = new ButtonBuilder()
                    .setCustomId('denyTrade')
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger);
                const row = new ActionRowBuilder()
			        .addComponents(cardSelect);
                const btonRow = new ActionRowBuilder()
			        .addComponents(cancelBton);

                var newEmbed = new EmbedBuilder()
                    .setTitle(`Choose a card ${interaction.user.username}!`)
                    .setColor('277F4A')
                    .setDescription(`Trading for ${embed.fields[0].value}`)
                    .setFooter({ text: `Trade accepted!` , iconURL: interaction.user.avatarURL()})
                    .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url})
                    .setImage(embed.image.url)

                await interaction.update({
                    embeds: [newEmbed],
                    components: [row, btonRow],
                });
                break;
            } case('confirmTrade'): {
                var embed = interaction.message.embeds[0].data
                const reqId = embed.footer.icon_url.split("/")[4]
                const sentId = embed.author.icon_url.split("/")[4]
                if (interaction.user.id !== sentId) {
                    await interaction.reply({ content: "You are not the user that has to confirm this trade!", ephemeral: true });
                    return;
                }

                const dbOne = (await checkUser(db, sentId))['user_id']
                const dbTwo = (await checkUser(db, reqId))['user_id']
                const cards = embed.description.split(" ⇔ ")
                const cardOne = cards[0].replace(cards[0].split(" ")[0], '').replace(" ", '')
                const cardTwo = cards[1].replace(cards[1].split(" ")[0], '').replace(" ", '')
                tradeCards(db, dbOne, dbTwo, cardOne, cardTwo)
                
                embed.footer.text = `Trade completed!`
                await interaction.update({
                    embeds: [embed],
                    components: []
                })
                await interaction.followUp("Trade has been completed, please check that you both have the corresponding cards!")
                break;
            } case('denyTrade'): {
                const reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
                const sentId = interaction.message.embeds[0].data.author.icon_url.split("/")[4]
                var embed = interaction.message.embeds[0].data
                embed.footer.text = `Trade cancelled by ${interaction.user.username}`

                if (interaction.user.id !== reqId && interaction.user.id !== sentId) {
                    await interaction.reply({ content: "You cannot cancel a trade that you are not part of!", ephemeral: true });
                    return;
                }

                await interaction.update({
                    embeds: [embed],
                    components: []
                })
                await interaction.followUp("Trade has been cancelled!")
                break;
            } case('cancelReset'): {
                if (interaction.user.id !== interaction.message.interaction.user.id){
                    await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
                    return;
                }

                await interaction.update({
                    components: []
                })
                await interaction.followUp("Data deletion has been cancelled!")
                break;
            } case('acceptReset'): {
                if (interaction.user.id !== interaction.message.interaction.user.id){
                    await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
                    return;
                }

                const userId = interaction.user.id
                const dbId = (await checkUser(db, userId))['user_id']
                var chkEmbed = interaction.message.embeds[0].data
                if (chkEmbed.description.includes("FINAL WARNING")) {
                    deleteAllData(db, dbId)
                    await interaction.update({components: []})
                    return await interaction.followUp("All your data has been reset.")
                }

                const newRow = ddDataRow()
                var newEmbed = new EmbedBuilder()
                    .setDescription("💣 **FINAL WARNING:**\nAre you absolutely sure you want to delete all your data? You will NOT be able to recover it.")
                    .setColor("#EB0E0E")
                
                await interaction.update({
                    embeds: [newEmbed],
                    components: [newRow]
                })

            } default: return; }
        } else if (interaction.isStringSelectMenu()){
            if(interaction.customId === 'cardChoose'){
                const reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
                if (interaction.user.id !== reqId){
                    await interaction.reply({ content: "You cannot interact with a trade that is not directed to you!", ephemeral: true });
                    return;
                }
                
                const givenCard = interaction.values[0]
                const queryCard = await getCardData(db, givenCard)
                var embed = interaction.message.embeds[0].data
                const cardStr = embed.description.replace("Trading for ", '')
                const ogCard = cardStr.replace(cardStr.split(" ")[0], '').replace(" ", '')
                const ogCardEmoji = cardStr.split(" ")[0]
                const tradeCardEmoji = rarityRequest(queryCard['card_rarity_id'], 'emoji')
                const embedString = `${ogCardEmoji} ${ogCard} ⇔ ${tradeCardEmoji} ${givenCard}`

                if (givenCard === ogCard){
                    await interaction.reply({ content: "You cannot offer the same card that you would get!", ephemeral: true })
                    return
                }

                const newEmbed = tradeConfirmEmbed(embed, embedString, queryCard['card_img_url'])
                const newRow = tradeConfirmRow()

                interaction.update({
                    embeds: [newEmbed],
                    components: [newRow],
                })
            }
        } else {
            return
        }
    }
};
