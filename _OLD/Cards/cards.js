const { ReactionCollector } = require("discord.js")

module.exports = {
    name: 'cards [user]',
    description: "This command is to see what cards you have or another user's cards.",
    async execute(message, args, client, Discord, config, keyv, db, fs){
        if (args.length == 0){
            let page = 1
            let Dcards = ""
            let obj = await db.get(message.author.id)
            if (obj == null){
                Dcards = `<@${message.author.id}> has no cards!`
            }
            else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                Dcards += `${key}\n`
            }

            if (Dcards == ""){
                Dcards = `<@${message.author.id}> has no cards!`
            }

            var embed = new Discord.MessageEmbed()
            .setTitle(`These are your cards:`)
            .setColor("#18E6E6")
            .setDescription(Dcards)
            .setFooter("Page " + page)

            let sent = await message.channel.send(embed)
            try{
                await sent.react('⬅️')
                await sent.react('➡️')
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
            const filter = (reaction, user) => user.id == message.author.id && (reaction.emoji.name == '⬅️' || reaction.emoji.name == '➡️')
            const collector = sent.createReactionCollector(filter, { idle: 15000 })
            collector.on('collect', async r => {
                if (r.emoji.name === '➡️'){
                    const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id))
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }
                    if (page != 10){
                        Dcards = ""
                        page = page + 1
                        let obj = await db.get(message.author.id)
                        if (obj == null){
                            Dcards = `<@${message.author.id}> has no cards!`
                        }
                        else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                            Dcards += `${key}\n`
                        }

                        if (Dcards == ""){
                            Dcards = `<@${message.author.id}> has no cards!`
                        }

                        var embed = new Discord.MessageEmbed()
                        .setTitle(`These are your cards:`)
                        .setColor("#18E6E6")
                        .setDescription(Dcards)
                        .setFooter("Page " + page)

                        sent.edit(embed)
                    }
                }
                else if (r.emoji.name === '⬅️'){
                    const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id))
                    try {
                        for (const reaction of userReactions.values()) {
                            await reaction.users.remove(message.author.id);
                        }
                    } catch (error) {
                        console.error('Failed to remove reactions.');
                    }
                    if (page != 1){
                        Dcards = ""
                        page = page - 1
                        let obj = await db.get(message.author.id)
                         if (obj == null){
                            Dcards = `<@${message.author.id}> has no cards!`
                        }
                        else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                            Dcards += `${key}\n`
                        }

                        if (Dcards == ""){
                            Dcards = `<@${message.author.id}> has no cards!`
                        }

                        var embed = new Discord.MessageEmbed()
                        .setTitle(`These are your cards:`)
                        .setColor("#18E6E6")
                        .setDescription(Dcards)
                        .setFooter("Page " + page)

                        sent.edit(embed)
                    }
                }
                })
                collector.on('end', async collected => {
                    await sent.edit(new Discord.MessageEmbed()
                    .setTitle(`These are your cards:`)
                    .setColor("#18E6E6")
                    .setDescription(Dcards)
                    .setFooter("Page " + page + " - Time expired!")
                    )
                }
            )
        }
        else if (args.length == 1){
            if (args[0].startsWith("<@") || message.guild.member(args[0])){

                let page = 1
                let Dcards = ""
                let obj = await db.get(args[0].replace(/[\\<>@#&!]/g, ""))
                if (obj == null){
                    Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                }
                else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                    Dcards += `${key}\n`
                }

                if (Dcards == ""){
                    Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                }

                let cUsername = ""
                if (args[0].startsWith("<@")){
                    cUsername = message.mentions.users.first().username
                }
                else if (message.guild.member(args[0])){
                    cUsername = message.guild.members.cache.get(args[0]).user.username
                }
                var embed = new Discord.MessageEmbed()
                .setTitle(`These are ${cUsername}'s cards:`)
                .setColor("#18E6E6")
                .setDescription(Dcards)
                .setFooter("Page " + page)

                let sent = await message.channel.send(embed)
                try{
                    await sent.react('⬅️')
                    await sent.react('➡️')
                } catch (error) {
                    console.error('One of the emojis failed to react.');
                }
                const filter = (reaction, user) => user.id == message.author.id && (reaction.emoji.name == '⬅️' || reaction.emoji.name == '➡️')
                    const collector = sent.createReactionCollector(filter, { idle: 15000 })
                    collector.on('collect', async r => {
                    if (r.emoji.name === '➡️'){
                        const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(args[0].replace(/[\\<>@#&!]/g, "")))
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(args[0].replace(/[\\<>@#&!]/g, ""));
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }

                        if (page != 10){
                            Dcards = ""
                            page = page + 1
                            let obj = await db.get(args[0].replace(/[\\<>@#&!]/g, ""))
                            if (obj == null){
                                Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                            }
                            else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                                Dcards += `${key}\n`
                            }

                            if (Dcards == ""){
                                Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                            }

                            let cUsername = ""
                            if (args[0].startsWith("<@")){
                                cUsername = message.mentions.users.first().username
                            }
                            else if (message.guild.member(args[0])){
                                cUsername = message.guild.members.cache.get(args[0]).user.username
                            }
                            var embed = new Discord.MessageEmbed()
                            .setTitle(`These are ${cUsername}'s cards:`)
                            .setColor("#18E6E6")
                            .setDescription(Dcards)
                            .setFooter("Page " + page)

                            sent.edit(embed)
                        }
                    }
                    else if (r.emoji.name === '⬅️'){
                        const userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(args[0].replace(/[\\<>@#&!]/g, "")));
                        try {
                            for (const reaction of userReactions.values()) {
                                await reaction.users.remove(args[0].replace(/[\\<>@#&!]/g, ""));
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }

                        if (page != 1){
                            Dcards = ""
                            page = page - 1
                            let obj = await db.get(args[0].replace(/[\\<>@#&!]/g, ""))
                            if (obj == null){
                                Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                            }
                            else for([key, value] of Object.entries(obj).slice(((page * 10) - 10), (page * 10))) {
                                Dcards += `${key}\n`
                            }

                            if (Dcards == ""){
                                Dcards = `<@${args[0].replace(/[\\<>@#&!]/g, "")}> has no cards!`
                            }

                            let cUsername = ""
                            if (args[0].startsWith("<@")){
                                cUsername = message.mentions.users.first().username
                            }
                            else if (message.guild.member(args[0])){
                                cUsername = message.guild.members.cache.get(args[0]).user.username
                            }
                            var embed = new Discord.MessageEmbed()
                            .setTitle(`These are ${cUsername}'s cards:`)
                            .setColor("#18E6E6")
                            .setDescription(Dcards)
                            .setFooter("Page " + page)

                            sent.edit(embed)
                        }
                    }
                    })
                    collector.on('end', async collected => {
                        let cUsername = ""
                        if (args[0].startsWith("<@")){
                            cUsername = message.mentions.users.first().username
                        }
                        else if (message.guild.member(args[0])){
                            cUsername = message.guild.members.cache.get(args[0]).user.username
                        }
                        
                        await sent.edit(new Discord.MessageEmbed()
                        .setTitle(`These are ${cUsername}'s cards:`)
                        .setColor("#18E6E6")
                        .setDescription(Dcards)
                        .setFooter("Page " + page + " - Time expired!")
                        )
                    }
                )
            }
            else{
                return message.channel.send("Invalid type of argument!\nSyntax is `!cards [user]`")
            }
        }
        else{
           return message.channel.send("Invalid number of arguments!\nSyntax is `!cards [user]`")
        }
    }
}