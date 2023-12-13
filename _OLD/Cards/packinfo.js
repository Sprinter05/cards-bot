module.exports = {
    name: 'packinfo <free pack | special pack | ultra pack>',
    description: "This is to show information about a pack",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks){
        args = args.join(' ')

        if (args.length == 0){
            return message.channel.send("Invalid number of arguments!\nSyntax is `!packinfo <free pack | special pack | ultra rare pack>`")
        }
        else{
            if (args.toLowerCase() === "free pack"){
                var embed = new Discord.MessageEmbed()
                .setAuthor('Packs Info', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/bar-chart_1f4ca.png')
                .setTitle("Free Pack")
                .setDescription("â€¢Common Card = 74%\nâ€¢Rare Card = 22%\nâ€¢Ultra Rare Card = 4%")
                .setFooter("Free Packs don't include all existing cards")
                .setColor("#8F8D8E")

                message.channel.send(embed)
            }
            else if (args.toLowerCase() === "special pack"){
                var embed = new Discord.MessageEmbed()
                .setAuthor('Packs Info', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/bar-chart_1f4ca.png')
                .setTitle("Special Pack")
                .setDescription("â€¢Common Card = 53%\nâ€¢Rare Card = 34%\nâ€¢Ultra Rare Card = 13%")
                .setFooter("Special Packs include all existing cards")
                .setColor("#F29658")

                message.channel.send(embed)
                
            }
            else if (args.toLowerCase() === "ultra rare pack"){
                var embed = new Discord.MessageEmbed()
                .setAuthor('Packs Info', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/57/bar-chart_1f4ca.png')
                .setTitle("Ultra Rare Pack")
                .setDescription("â€¢Common Card = 7%\nâ€¢Rare Card = 66%\nâ€¢Ultra Rare Card = 27%")
                .setFooter("Ultra Rare Packs don't include all Common Cards")
                .setColor("#DB757B")

                message.channel.send(embed)
            }
            else{
                return message.channel.send("Invalid type of pack!\nSyntax is `!packinfo <free pack | special pack | ultra rare pack>`")
            }
        }
    }
}