const { version } = require("discord.js");

module.exports = {
    name: 'status',
    description: "This shows the bot status.",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown, packages, humanizeDuration){
        
        let memoryUsage = process.memoryUsage().rss
        memoryUsage = Math.round(memoryUsage / 1024 / 1024 * 100) / 100
        let nodeVersion = packages.dependencies['discord.js']
        nodeVersion = nodeVersion.replace('^', '')
        let keyvVersion = packages.dependencies['@keyv/sqlite']
        keyvVersion = keyvVersion.replace('^', '')
        let version = packages.version

        let uptime = client.uptime
        uptime = humanizeDuration(uptime, { round: true, units: ["d", "h", "m"] })

        var embed = new Discord.MessageEmbed()
        .setAuthor('Cards Bot', client.user.avatarURL())
        .setTitle("Cards-Bot Status")
        .addFields(
            { name: '• Bot Version:', value: version, inline: true },
            { name: '• Discord.js Version:', value: nodeVersion, inline: true },
            { name: '• Keyv Version:', value: keyvVersion, inline: true },
            { name: '• Memory Usage:', value: memoryUsage + 'MB', inline: true },
		    { name: '• Uptime:', value: uptime, inline: true },
        )
        
        message.channel.send(embed)
    }
}