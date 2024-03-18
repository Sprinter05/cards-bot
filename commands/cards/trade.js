const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, InteractionCollector  } = require("discord.js")
var { rarityRequest } = require('../../utils/functionExporter.js')
var { countCards, checkUser, getCardData, checkCardOwn } = require('../../utils/queries.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('trade')
        .setDescription ("Use this command to trade a card with another user.")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to trade with.')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('card')
            .setDescription('Card to trade.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
              .setName('request')
              .setDescription('Request a card')
              .setRequired(false)
          ),
    // Main function
    async execute(interaction, cardsdb){
        const userToTrade = interaction.options.getUser('user');
        const user = interaction.user;
        const userQueryId = await checkUser(cardsdb, user.id)
        const userTTQueryId = await checkUser(cardsdb, userToTrade.id)
        const dbId = userQueryId === null ? -1 : userQueryId['user_id']
        const dbTTId = userTTQueryId === null ? -1 : userTTQueryId['user_id']

        var cardTTOne = interaction.options.getString('card');
        const queryCard = await getCardData(cardsdb, cardTTOne)
        var cardReq = interaction.options.getString('request')
        const queryRCard = cardReq !== null ? await getCardData(cardsdb, cardReq) : 0

        if ((await countCards(cardsdb, dbId)) <= 0 ) return await interaction.reply("You don't have any cards!");
        else if ((await countCards(cardsdb, dbTTId)) <= 0) return await interaction.reply(`${userToTrade.username} doesn't have any cards!`);

        if (queryCard === null) return await interaction.reply("The card to trade does not exist!")
        if (queryRCard === null) return await interaction.reply("The card requested does not exist!")

        const cardOwned = await checkCardOwn(cardsdb, dbId, queryCard['card_id'])
        const cardROwned = cardReq !== null ? await checkCardOwn(cardsdb, dbTTId, queryRCard['card_id']) : 0

        if (cardOwned === false) return await interaction.reply("You don't have that card!")
        if (cardROwned === false) return await interaction.reply(`${userToTrade.username} doesn't have the requested card!`)

        const rarEmoji = rarityRequest(queryCard['card_rarity_id'], 'emoji')
        const rarREmoji = rarityRequest(queryRCard['card_rarity_id'], 'emoji')

        const reqStr = cardReq === null ? 'None' : `${rarREmoji} ${cardReq}`

        var embed = new EmbedBuilder()
        .setTitle(`Trading requested to ${userToTrade.username}!`)
        .setAuthor({ name: `${user.username} wants to trade!`, iconURL: user.avatarURL()})
        .addFields(
            { name: 'Card:', value: `${rarEmoji} ${queryCard['card_name']}` },
            { name: 'Requests:', value: `${reqStr}` }
        )
        .setImage(queryCard['card_img_url'])
        .setColor("#18E6E6")
        .setFooter({ text: `You have 1 minute to accept!` , iconURL: userToTrade.avatarURL()})

        const acceptBton = new ButtonBuilder()
			.setCustomId('acceptTrade')
			.setLabel('Accept')
			.setStyle(ButtonStyle.Success);
		const denyBton = new ButtonBuilder()
			.setCustomId('denyTrade')
			.setLabel('Deny')
			.setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder()
			.addComponents(acceptBton, denyBton);
        
        const tradeResp = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true
        })

        await tradeResp.awaitMessageComponent({ time: 60_000 })
            .catch(async (error) => {
                row.components[0].setDisabled(true)
                row.components[1].setDisabled(true)
                embed.setFooter({ text: `Trade expired!` , iconURL: userToTrade.avatarURL()})
                await interaction.editReply({
                    embeds: [embed],
                    components: [row],
                })
            });  
    }
}