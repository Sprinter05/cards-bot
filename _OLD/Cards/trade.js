module.exports = {
    name: 'trade <card> <user>',
    description: "This command is to trade a card you have with another user. Card name is case sensible. Spaces on the card name must be replaced with a _ .",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown){
        let obj = await db.get(message.author.id)

        if (args.length == 2){
            let args_available = ["Huey", "Goomba", "Koopa", "Shy_Guy", "Mario", "Luigi", "Vivian", "Tippi", "Peach", "O'Chunks", "Mimi", "Bowser", "Rawk_Hawk", "Kersti", "Goombario", "Goombella", "Bobbery", "Gonzales", "Parakarry", "Doopliss", "Flurrie", "Francis", "Kammy_Koopa", "Grubba", "Bobby", "Olivia", "Eldstar", "X-Naut", "Watt", "Kamek", "Pennington", "Sir_Grodus", "Count_Bleck", "Shadow_Queen", "King_Olly", "Dimentio", "Flavio", "Bombette", "Ninji", "Merlon", "Nastasia", "Mr._L", "Whacka", "Origami_Spike", "Origami_Koopa", "Origami_Pokey", "Origami_Goomba", "Origami_Hammer_Bro", "Origami_Shy_Guy", "12_Colored_Pencils", "Captain_T.Ode", "No_face_toad", "Professor_Toad", "Folded_Bowser", "Origami_Peach", "King_Goomba", "Fracktail", "Bowser_Jr.", "Cheep_Cheep", "Lady_Bow"]
            let cards_available = ["Huey", "Goomba", "Koopa", "Shy Guy", "Mario", "Luigi", "Vivian", "Tippi", "Peach", "O'Chunks", "Mimi", "Bowser", "Rawk Hawk", "Kersti", "Goombario", "Goombella", "Bobbery", "Gonzales", "Parakarry", "Doopliss", "Flurrie", "Francis", "Kammy Koopa", "Grubba", "Bobby", "Olivia", "Eldstar", "X-Naut", "Watt", "Kamek", "Pennington", "Sir Grodus", "Count Bleck", "Shadow Queen", "King Olly", "Dimentio", "Flavio", "Bombette", "Ninji", "Merlon", "Nastasia", "Mr. L", "Whacka", "Origami Spike", "Origami Koopa", "Origami Pokey", "Origami Goomba", "Origami Hammer Bro", "Origami Shy Guy", "12 Colored Pencils", "Captain T.Ode", "No face toad", "Professor Toad", "Folded Bowser", "Origami Peach", "King Goomba", "Fracktail", "Bowser Jr.", "Cheep Cheep", "Lady Bow"]
            if (obj == null){
                return message.channel.send("You don't have any cards!")
            }
            else{
            if (args_available.includes(args[0])){
                if (obj.hasOwnProperty(args[0].replace('_', " "))){
                    if (args[1].startsWith("<@") && message.guild.member(args[1].replace(/[\\<>@#&!]/g, ""))){
                        if (args[1].replace(/[\\<>@#&!]/g, "") == message.author.id){
                            return message.channel.send("You can't trade with yourself!")
                        }
                        else{
                            var embed = new Discord.MessageEmbed()
                            .setDescription(args[1] + ", **" + message.author.username + "** wants to trade " + args[0] + " card\nType `!accept <card in exchange>` to accept the trade.\nYou have 30 seconds to accept.")
                            .setColor("#FCE300")

                            message.channel.send(embed)

                        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === args[1].replace(/[\\<>@#&!]/g, ""), { time: 30000 });
                        let cancelled = false

                        collector.on('collect', async m => {
                            const argsResponse = m.content.slice(config.prefix.length).split(/ +/);
                            const commandResponse = argsResponse.shift().toLowerCase();
                            let objResponse = await db.get(args[1].replace(/[\\<>@#&!]/g, ""))

                            if (commandResponse === 'accept') {
                                if (cancelled == false){
                                if (argsResponse.length == 1){
                                    if (cards_available.includes(argsResponse[0])){
                                        if (objResponse == null){
                                            var embed = new Discord.MessageEmbed()
                                            .setDescription("❌ You don't have any cards!")
                                            .setColor("#f11313")
                                            return message.channel.send(embed)
                                        }
                                        else{
                                        if (objResponse.hasOwnProperty(argsResponse[0])){
                                            cancelled = true
                                            collector.stop('Trade ended')

                                            objResponse[args[0]] = "Traded"
                                            delete obj[args[0]]

                                            obj[argsResponse[0]] = "Traded"
                                            delete objResponse[argsResponse[0]]

                                            await db.set(message.author.id, obj)
                                            await db.set(m.author.id, objResponse)

                                            var embed = new Discord.MessageEmbed()
                                            .setDescription("✅ Trade done! You just exchanged a __" + args[0] + "__ from " + "**" + message.author.username +  "**" + " for a __" + argsResponse[0] + "__ from " + "**" + m.author.username + "** . Please check your cards to see if everything worked correctly. If the trade didn't go as expected please contact Sprinter05.")
                                            .setColor("#16c60c")
                                            message.channel.send(embed)
                                        }
                                        else{
                                            var embed = new Discord.MessageEmbed()
                                            .setDescription("❌ You don't have that card!")
                                            .setColor("#f11313")
                                            return message.channel.send(embed)
                                        }
                                        }
                                    }
                                    else{
                                        
                                        return message.channel.send("Invalid card!\nRemember that card name is case sensible and if a card has a space you must replace it with _\nSyntax is `!accept <card>`")
                                    }
                                }
                                else{
                                    return message.channel.send("Invalid number of arguments!\nSyntax is `!accept <card>`")
                                }
                                }
                            }
                        })
                        collector.on('end', async collected => {
                            if (cancelled == false){
                                var embed = new Discord.MessageEmbed()
                                .setDescription("❌ **OPERATION CANCELLED**\nTime Expired.")
                                .setColor("#f11313")
                                message.channel.send(embed)
                            }
                        })
                        }
                    }
                    else{
                        return message.channel.send("Invalid user!\nSyntax is `!trade <card> <user>`")
                    }
                }
                else{
                    var embed = new Discord.MessageEmbed()
                    .setDescription("❌ You don't have that card!")
                    .setColor("#f11313")
                    return message.channel.send(embed)
                }
            }
            else{
                return message.channel.send("Invalid card!\nRemember that card name is case sensible and if a card has a space you must replace it with _\nSyntax is `!trade <card> <user>`")
            }
        }
        }
        else{
            return message.channel.send("Invalid number of arguments!\nSyntax is `!trade <card> <user>`")
        }
    }
}