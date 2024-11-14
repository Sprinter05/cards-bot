const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription ("This command is to ping the bot"),
    async execute(interaction, cardsdb){
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true })
        var ping = sent.createdTimestamp - interaction.createdTimestamp
        var latency = interaction.client.ws.ping
        await interaction.editReply(`Pong! 🏓\nTook: ${ping}ms\nAPI: ${latency}ms`)
    }
}