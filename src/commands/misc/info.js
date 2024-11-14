const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
const { logoURL } = require('../../../config/properties.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription ("This command is to show the information about the bot"),
    async execute(interaction, cardsdb){
        var embed = new EmbedBuilder()
        .setTitle("Paper Mario Card Packs")
        .setThumbnail(logoURL)
        .setFooter({ text: 'Code by Sprinter05 | Card designs by Sprinter05 and tee.'})

        await interaction.reply({embeds: [embed]})
    }
}