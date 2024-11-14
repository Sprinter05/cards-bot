const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        // Set bot initial status
		console.log(`Bot is now online,\nLogged as ${client.user.tag}.\nBot is in ${client.guilds.cache.size} ` + `server(s)` + `.`)
        var Logembed = new EmbedBuilder()
            .setTitle(`âœ… Bot is now online!`)
            .setColor(0x53da1f)
            .setTimestamp()
            .setDescription(`Logged as ` + '`' + `${client.user.tag}` + '`' + `.\nBot is in **${client.guilds.cache.size}** ` + `server(s)` + '.')
        // Send log to the log channel and set status
        client.channels.cache.get("748551379101941851").send({embeds: [Logembed]})
        client.user.setStatus('available')
        client.user.setActivity('!help for commands | !info for Credits', { type: 'WATCHING' })
	},
};
