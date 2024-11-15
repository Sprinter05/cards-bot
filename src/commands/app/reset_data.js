const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { ddDataRow } = require(appRoot + "src/utils/exporter");

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('reset_data')
        .setDescription ("Reset ALL data from a user"),
    // Main function
    async execute(interaction, cardsdb){
        // Get the initial information embed
        var embed = new EmbedBuilder()
            .setDescription("⚠️ **WARNING:**\nThis will reset all your data from this bot (cards, packs, etc.). Once done you can't recover that data, do you wish to continue?")
            .setColor("#FCE300")

        // All interactions are handled by this function
        const row = ddDataRow()

        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}