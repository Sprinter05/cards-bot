const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription ("This command is to ping the bot"),
    async execute(interaction, cardsdb){
        // Get the difference between the creation of the interaction and the creation of the reply
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true })
        var ping = sent.createdTimestamp - interaction.createdTimestamp
        var latency = interaction.client.ws.ping
        
        // Update ping response with latency
        await interaction.editReply(`Pong! 🏓\nTook: ${ping}ms\nAPI: ${latency}ms`)
    }
}