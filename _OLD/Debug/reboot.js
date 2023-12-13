module.exports = {
    name: 'reboot',
    description: "This command is to reboot the bot and is only for bot owner.",
    execute(message, args, client, Discord, config){
        if (message.author.id !== config.botowner){
            var evalEmbed = new Discord.MessageEmbed()
            .setDescription(":x: You are not the `Bot Owner` so you can't use this command.")
            .setColor("#f11313")
            return message.channel.send(evalEmbed);
        }
        else {
            resetBot(message.channel);

            function resetBot(channel) {
                var Logembed = new Discord.MessageEmbed()
            .setTitle(`Bot has been rebooted through Discord.`)
            .setColor("#7289da")
            .setTimestamp()
            .setDescription(`Rebooted by Discord User ` + '`' + `${message.author.tag}` + '`' + ` (ID: ${message.author.id})\nLogged as ` + '`' + `${client.user.tag}` + '`' + `.\nBot is in **${client.guilds.cache.size}** ` + `server(s)` + '.')

                channel.send('Rebooting...')
                .then(msg => client.destroy())
                .then(() => client.login(config.token))
                .then(() => console.log(`Bot has been rebooted through Discord.\nRebooted by Discord User ${message.author.tag} (ID: ${message.author.id})\nLogged as ${client.user.tag}.\nBot is in ${client.guilds.cache.size} servers.`))
                .then(() => client.guilds.cache.get("744491574012149760").channels.cache.get("748551379101941851").send(Logembed))
                .then(() => client.user.setActivity('I am in early development'))
                channel.send('Succesfully rebooted!') 
            }
        }
    }
}