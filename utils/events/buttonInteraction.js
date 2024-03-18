const { Events, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var { checkUser, getAllCards, getCardData } = require('../queries')
var { cardEmbed, cardsMaxPage, cardRow, rarityRequest } = require('../functionExporter')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, db) {
	    if (interaction.isButton()) {
            if(interaction.customId === 'cardPrev' || interaction.customId == 'cardNext'){
                if (interaction.user.id !== interaction.message.interaction.user.id){
                    await interaction.reply({ content: "You cannot interact with a command you did not send!", ephemeral: true });
                    return;
                }

                currEmbed = interaction.message.embeds[0].data
                uId = interaction.user.id
                chkDbId = (await checkUser(db, uId))['user_id']
                dbId = parseInt(currEmbed.footer.text.split(' ╏ ')[1].replace('ID ',''))
                
                offset = 0;
                if(interaction.customId === 'cardNext'){offset = 1}
                else if(interaction.customId === 'cardPrev'){offset = -1}

                const msgTitle = dbId === chkDbId ? 0 : currEmbed.title.replace('These are ', '').replace(`'s cards:`, '')
                page = parseInt(currEmbed.footer.text.split(' ╏ ')[0].replace('Page ',''))+offset
                maxPage = await cardsMaxPage(db, dbId)
                
                newEmbed = await cardEmbed(db, dbId, msgTitle, page)
                newRow = await cardRow(page, maxPage)

                // MariaDB moment
                if (page <= 1) {newRow.components[0].setDisabled(true)}
                if (page >= maxPage) {newRow.components[1].setDisabled(true)}

                await interaction.update({
                    embeds: [newEmbed],
                    components: [newRow],
                })
            } else if(interaction.customId === 'acceptTrade'){

                reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
                sentId = interaction.message.embeds[0].data.author.icon_url.split("/")[4]
                reqDbId = (await checkUser(db, reqId))['user_id']
                sentDbId = (await checkUser(db, sentId))['user_id']

                if (interaction.user.id !== reqId) {
                    await interaction.reply({ content: "You cannot accept your own trade request!", ephemeral: true });
                    return;
                }

                cardJSON = await getAllCards(db, reqDbId)
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
                const row = new ActionRowBuilder()
			        .addComponents(cardSelect);

                var embed = interaction.message.embeds[0].data
                var newEmbed = new EmbedBuilder()
                    .setTitle(`Choose a card ${interaction.user.username}!`)
                    .setColor('277F4A')
                    .setDescription(`Trading for ${embed.fields[0].value}`)
                    .setFooter({ text: `Trade accepted!` , iconURL: interaction.user.avatarURL()})
                    .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url})
                    .setImage(embed.image.url)

                await interaction.update({
                    embeds: [newEmbed],
                    components: [row],
                });

            } else if(interaction.customId === 'denyTrade'){
                
            }
        } else if (interaction.isStringSelectMenu()){
            if(interaction.customId === 'cardChoose'){

                reqId = interaction.message.embeds[0].data.footer.icon_url.split("/")[4]
                if (interaction.user.id !== reqId){
                    await interaction.reply({ content: "You cannot interact with a trade that is not directed to you!", ephemeral: true });
                    return;
                }
                
                const queryCard = await getCardData(db, interaction.values[0])
                var embed = interaction.message.embeds[0].data
                const ogCard = embed.description.split(" ")[3]
                const ogCardEmoji = embed.description.split(" ")[2]
                const tradeCardEmoji = rarityRequest(queryCard['card_rarity_id'], 'emoji')

                var newEmbed = new EmbedBuilder()
                    .setTitle(`Confirm the trade ${embed.author.name.split(" ")[0]}!`)
                    .setDescription(`${ogCardEmoji} ${ogCard} ⇔ ${tradeCardEmoji} ${interaction.values[0]}`)
                    .setColor("#18E6E6")
                    .setFooter({ text: `Trade accepted!` , iconURL: interaction.user.avatarURL()})
                    .setAuthor({ name: embed.author.name, iconURL: embed.author.icon_url})
                    .setImage(queryCard['card_img_url'])
                    .setThumbnail(embed.image.url)

                const confirmBton = new ButtonBuilder()
                    .setCustomId('confirmTrade')
                    .setLabel('Confirm')
                    .setStyle(ButtonStyle.Success);
                const cancelBton = new ButtonBuilder()
                    .setCustomId('cancelTrade')
                    .setLabel('Cancel')
                    .setStyle(ButtonStyle.Danger);
                const newRow = new ActionRowBuilder()
                    .addComponents(confirmBton, cancelBton);

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
