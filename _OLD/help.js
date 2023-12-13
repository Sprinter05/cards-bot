module.exports = {
    name: 'help',
    description: "This command is to see the bot commands",
    async execute(message, args, client, Discord, config, fs){
        let helpDescription1 = client.commands.map(command => "`" + `!${command.name}` + "`:" + `\n${command.description}`).join('\n\n')
        let helpDescription2 = client.cards.map(cardcommand => "`" + `!${cardcommand.name}` + "`:" + `\n${cardcommand.description}`).join('\n\n')
        let helpTitle = ""
        let page = 1

        if (page == 1){
            helpTitle = "__**Commands:**__"
        }
        if (page == 2){
            helpTitle = "__**Card Commands:**__"
        }

        var embed = new Discord.MessageEmbed()
        .setTitle(helpTitle)
        .setDescription(helpDescription1)
        .setFooter("Page " + page + "/2")
        .setColor("#7db8e0")

        let sent = await message.channel.send(embed)
        try{
            await sent.react('⬅️')
            await sent.react('➡️')
        }
        catch (error) {
            console.error('One of the emojis failed to react.');
        }

        const filter = (reaction, user) => user.id == message.author.id && (reaction.emoji.name == '⬅️' || reaction.emoji.name == '➡️')
        const collector = sent.createReactionCollector(filter, { idle: 15000 })
        collector.on('collect', async r => {
        if (r.emoji.name === '➡️'){
            const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(message.author.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            if (page != 2){
                page = page + 1
                if (page == 1){
                    helpTitle = "__**Commands:**__"
                }
                if (page == 2){
                    helpTitle = "__**Card Commands:**__"
                }

                var embed = new Discord.MessageEmbed()
                .setTitle(helpTitle)
                .setDescription(helpDescription2)
                .setFooter("Page " + page + "/2")
                .setColor("#7db8e0")

                await sent.edit(embed)
            }
        }
        else if (r.emoji.name === '⬅️'){
            const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(message.author.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            if (page != 1){
                page = page - 1
                if (page == 1){
                    helpTitle = "__**Commands:**__"
                }
                if (page == 2){
                    helpTitle = "__**Card Commands:**__"
                }

                var embed = new Discord.MessageEmbed()
                .setTitle(helpTitle)
                .setDescription(helpDescription1)
                .setFooter("Page " + page + "/2")
                .setColor("#7db8e0")

                await sent.edit(embed)
            }
        }
        })

        collector.on('end', async collected => {
            let descr = ""
            if (page == 1){
                helpTitle = "__**Commands:**__"
                descr = helpDescription1
            }
            if (page == 2){
                helpTitle = "__**Card Commands:**__"
                descr = helpDescription2
            }

            var embed = new Discord.MessageEmbed()
            .setTitle(helpTitle)
            .setDescription(descr)
            .setFooter("Page " + page + "/2" + " - Time expired!")
            .setColor("#7db8e0")

            await sent.edit(embed)
        }
    )
    }
}