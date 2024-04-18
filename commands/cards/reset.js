const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
var { checkUser } = require('../../utils/queries.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('reset_data')
        .setDescription ("Reset ALL data from a user"),
    // Main function
    async execute(interaction, cardsdb){
        const user = interaction.options.getUser('user') ?? interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']

        var embed = new EmbedBuilder()
            .setDescription("⚠️ **WARNING:**\nThis will reset all your data from this bot (cards, packs, etc.). Once done you can't recover that data, do you wish to continue?")
            .setColor("#FCE300")

        const confirmBton = new ButtonBuilder()
            .setCustomId('acceptReset')
            .setLabel('💣 Confirm')
            .setStyle(ButtonStyle.Danger);
        const cancelBton = new ButtonBuilder()
            .setCustomId('cancelReset')
            .setLabel('⛔ Cancel')
            .setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder()
            .addComponents(confirmBton, cancelBton);

        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}