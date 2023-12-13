module.exports = {
    name: 'dpoints',
    description: "This command lets you check your Duplication Points (DPoints).",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown, dpoints){
        let seepoints = await dpoints.get(message.author.id)

        if (seepoints == null){
            await dpoints.set(message.author.id, 0)
            seepoints = 0
        } 

        var embed = new Discord.MessageEmbed()
        .setDescription("<@" + message.author.id + "> has " + seepoints + " **Duplication Point(s)**.")
        .setColor("#49B86B")

        message.channel.send(embed)
    }
}