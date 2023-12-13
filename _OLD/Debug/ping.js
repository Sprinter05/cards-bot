module.exports = {
    name: 'ping',
    description: "This command outputs the latency of the bot.",
    execute(message, args, client, Discord, config){
        message.channel.send("Pinging...").then(m =>{
            var ping = m.createdTimestamp - message.createdTimestamp;
            var ping2 = client.ws.ping;

            var embed = new Discord.MessageEmbed()
            .setTitle(`:ping_pong: Pong!`)
            .setColor("#6ec0e4")
            .addFields(
              { name: '• API Ping', value: '`' + ping2 + '` ms', inline: false },
              { name: '• Server Ping', value: '`' + ping + '` ms', inline: false },
          )
            m.edit(embed)
            m.edit('')
        });
    }
}