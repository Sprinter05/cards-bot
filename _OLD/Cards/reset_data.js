module.exports = {
    name: 'reset_data',
    description: "This command is to reset all your cards data. Only works in the bot DMs.",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown){
        let DMuser = message.author

        var embed = new Discord.MessageEmbed()
        .setDescription("⚠️ **WARNING:**\nThis will reset all your data from this bot (cards, packs, etc.). Once done you can't recover that data, do you wish to continue?\n(yes/no)")
        .setColor("#FCE300")
        DMuser.send(embed)

        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id && message.channel.type === 'dm', { time: 10000 });
        let cancelled = false
        collector.on('collect', message => {

            if (message.content == "yes") {
                db.delete(message.author.id)
                dbpacks.delete(message.author.id)
                dbcooldown.delete(message.author.id)

                var embed = new Discord.MessageEmbed()
                .setDescription("✅ All data has been resetted.")
                .setColor("#16c60c")
                DMuser.send(embed)
                cancelled = true

                var Logembed = new Discord.MessageEmbed()
                .setTitle(`⚠️ Data resetted!`)
                .setColor("#FCE300")
                .setTimestamp()
                .setDescription('`' + `${message.author.tag}` + '`' + ` has resetted all its data`)
                client.guilds.cache.get("744491574012149760").channels.cache.get("748551379101941851").send(Logembed)
            }
            else if (message.content == "no"){
                var embed = new Discord.MessageEmbed()
                .setDescription("❌ **OPERATION CANCELLED**")
                .setColor("#f11313")
                DMuser.send(embed)
                cancelled = true
            }
        })
        collector.on('end', async collected => {
            if (cancelled == false){
                var embed = new Discord.MessageEmbed()
                .setDescription("❌ **OPERATION CANCELLED**\nTime Expired.")
                .setColor("#f11313")
                DMuser.send(embed)
            }
        })
    }
}