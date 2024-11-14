module.exports = {
    name: 'free',
    description: "Free Pack",
    async execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints){
        let cN = Math.floor(Math.random() * (53 + 1))
        let obj = await db.get(message.author.id)
        let dp = await dpoints.get(message.author.id)
        let footer = ""
        let Fdp = 1
        let Rdp = 3
        let Udp = 5
        
        if (cN == 0){
            if (obj.hasOwnProperty('Huey')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Huey__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941429221359727/huey.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Huey = 01
            await db.set(message.author.id, obj)
        }
        else if (cN == 1){
            if (obj.hasOwnProperty('Huey')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Huey__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941429221359727/huey.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Huey = 01
            await db.set(message.author.id, obj)
        }
        else if (cN == 2){
            if (obj.hasOwnProperty('Koopa')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Koopa__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941447185694770/koopa.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Koopa = 02
            await db.set(message.author.id, obj)
        }
        else if (cN == 3){
            if (obj.hasOwnProperty('Koopa')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Koopa__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941447185694770/koopa.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Koopa = 02
            await db.set(message.author.id, obj)
        }
        else if (cN == 4){
            if (obj.hasOwnProperty('Goomba')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goomba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941410582003742/goomba.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goomba = 03
            await db.set(message.author.id, obj)
        }
        else if (cN == 5){
            if (obj.hasOwnProperty('Goomba')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goomba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941410582003742/goomba.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goomba = 03
            await db.set(message.author.id, obj)
        }
        else if (cN == 6){
            if (obj.hasOwnProperty('Shy guy')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Shy Guy__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941534649253908/shyguy.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Shy guy'] = 04
            await db.set(message.author.id, obj)
        }
        else if (cN == 7){
            if (obj.hasOwnProperty('Shy guy')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Shy Guy__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941534649253908/shyguy.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Shy guy'] = 04
            await db.set(message.author.id, obj)
        }
        else if (cN == 8){
            if (obj.hasOwnProperty('Mario')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Mario__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941460963852368/mario.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Mario = 05
            await db.set(message.author.id, obj)
        }
        else if (cN == 9){
            if (obj.hasOwnProperty('Mario')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Mario__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941460963852368/mario.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Mario = 05
            await db.set(message.author.id, obj)
        }
        else if (cN == 10){
            if (obj.hasOwnProperty('Luigi')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Luigi__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941453221036092/luigi.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Luigi = 06
            await db.set(message.author.id, obj)
    }
        else if (cN == 11){
            if (obj.hasOwnProperty('Luigi')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Luigi__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941453221036092/luigi.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Luigi = 06
            await db.set(message.author.id, obj)
        }
        else if (cN == 12){
            if (obj.hasOwnProperty('Vivian')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Vivian__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941552630497340/vivian.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Vivian = 07
            await db.set(message.author.id, obj)
        }
        else if (cN == 13){
            if (obj.hasOwnProperty('Vivian')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Vivian__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941552630497340/vivian.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Vivian = 07
            await db.set(message.author.id, obj)
        }
        else if (cN == 14){
            if (obj.hasOwnProperty('Tippi')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Tippi__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941546573922314/tippi.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Tippi = 08
            await db.set(message.author.id, obj)
        }
        else if (cN == 15){
            if (obj.hasOwnProperty('Tippi')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Tippi__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941546573922314/tippi.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Tippi = 08
            await db.set(message.author.id, obj)
        }
        else if (cN == 16){
            if (obj.hasOwnProperty('Peach')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Peach__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941841102143570/peach.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Peach = 09
            await db.set(message.author.id, obj)
        }
        else if (cN == 17){
            if (obj.hasOwnProperty("O'Chunks")){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __O'Chunks__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941770344235119/chunks.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj["O'Chunks"] = 10
            await db.set(message.author.id, obj)
        }
        else if (cN == 18){
            if (obj.hasOwnProperty('Mimi')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Mimi__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941824148504666/mimi.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Mimi = 11
            await db.set(message.author.id, obj)
        }
        else if (cN == 19){
            if (obj.hasOwnProperty('Bowser')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bowser__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941764224614410/bowser.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Bowser = 12
            await db.set(message.author.id, obj)
        }
        else if (cN == 20){
            if (obj.hasOwnProperty('Rawk Hawk')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Rawk Hawk__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941853001383986/rawk.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Rawk Hawk'] = 13
            await db.set(message.author.id, obj)
        }
        else if (cN == 21){
            if (obj.hasOwnProperty('Dimentio')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Dimentio__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941954666987520/dimentio.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Dimentio = 36
            await db.set(message.author.id, obj)
        }
        else if (cN == 22){
            if (obj.hasOwnProperty('Kersti')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Kersti__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941441007353866/kersti.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Kersti = 14
            await db.set(message.author.id, obj)
        }
        else if (cN == 23){
            if (obj.hasOwnProperty('Kersti')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Kersti__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941441007353866/kersti.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Kersti = 14
            await db.set(message.author.id, obj)
        }
        else if (cN == 24){
            if (obj.hasOwnProperty('Goombario')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goombario__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941416457961552/goombario.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goombario = 15
            await db.set(message.author.id, obj)
        }
        else if (cN == 25){
            if (obj.hasOwnProperty('Goombario')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goombario__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941416457961552/goombario.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goombario = 15
            await db.set(message.author.id, obj)
        }
        else if (cN == 26){
            if (obj.hasOwnProperty('Goombella')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goombella__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941422837497917/goombella.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goombella = 16
            await db.set(message.author.id, obj)
        }
        else if (cN == 27){
            if (obj.hasOwnProperty('Goombella')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Goombella__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941422837497917/goombella.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Goombella = 16
            await db.set(message.author.id, obj)
        }
        else if (cN == 28){
            if (obj.hasOwnProperty('Bobbery')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bobbery__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941380307255306/bobbery.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Bobbery = 17
            await db.set(message.author.id, obj)
        }
        else if (cN == 29){
            if (obj.hasOwnProperty('Bobbery')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bobbery__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941380307255306/bobbery.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Bobbery = 17
            await db.set(message.author.id, obj)
        }
        else if (cN == 30){
            if (obj.hasOwnProperty('Gonzales')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Gonzales__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941405439655956/gonzales.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Gonzales = 18
            await db.set(message.author.id, obj)
        }
        else if (cN == 31){
            if (obj.hasOwnProperty('Gonzales')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Gonzales__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941405439655956/gonzales.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Gonzales = 18
            await db.set(message.author.id, obj)
        }
        else if (cN == 32){
            if (obj.hasOwnProperty('Parakarry')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Parakarry__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941518853505114/parakarry.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Parakarry = 19
            await db.set(message.author.id, obj)
        }
        else if (cN == 33){
            if (obj.hasOwnProperty('Parakarry')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Parakarry__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941518853505114/parakarry.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Parakarry = 19
            await db.set(message.author.id, obj)
        }
        else if (cN == 34){
            if (obj.hasOwnProperty('Doopliss')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Doopliss__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941389203505182/doopliss.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Doopliss = 20
            await db.set(message.author.id, obj)
        }
        else if (cN == 35){
            if (obj.hasOwnProperty('Doopliss')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Doopliss__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941389203505182/doopliss.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Doopliss = 20
            await db.set(message.author.id, obj)
        }
        else if (cN == 36){
            if (obj.hasOwnProperty('Flurrie')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Flurrie__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941399911563365/flurrie.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Flurrie = 21
            await db.set(message.author.id, obj)
        }
        else if (cN == 37){
            if (obj.hasOwnProperty('Flurrie')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Flurrie__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941399911563365/flurrie.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Flurrie = 21
            await db.set(message.author.id, obj)
        }
        else if (cN == 38){
            if (obj.hasOwnProperty('Francis')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Francis__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941788228616222/francis.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Francis = 22
            await db.set(message.author.id, obj)
        }
        else if (cN == 39){
            if (obj.hasOwnProperty('Kammy Koopa')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Kammy Koopa__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941811918176326/kammy.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Kammy Koopa'] = 23
            await db.set(message.author.id, obj)
        }
        else if (cN == 40){
            if (obj.hasOwnProperty('Grubba')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Grubba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941799909621800/grubba.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Grubba = 24
            await db.set(message.author.id, obj)
        }
        else if (cN == 41){
            if (obj.hasOwnProperty('Bobby')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bobby__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941758532943972/bobby.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Bobby = 25
            await db.set(message.author.id, obj)
        }
        else if (cN == 42){
            if (obj.hasOwnProperty('Olivia')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Olivia__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941836375031858/olivia.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Olivia = 26
            await db.set(message.author.id, obj)
        }
        else if (cN == 43){
            if (obj.hasOwnProperty('Eldstar')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Eldstar__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941959654015057/eldstar.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Eldstar = 27
            await db.set(message.author.id, obj)
        }
        else if (cN == 44){
            if (obj.hasOwnProperty('Origami Koopa')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Koopa__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941487530573850/origami_koopa.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Koopa'] = 45
            await db.set(message.author.id, obj)
        }
        else if (cN == 45){
            if (obj.hasOwnProperty('Origami Koopa')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Koopa__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941487530573850/origami_koopa.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Koopa'] = 45
            await db.set(message.author.id, obj)
        }
        else if (cN == 46){
            if (obj.hasOwnProperty('Origami Goomba')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Goomba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941474947530872/origami_goomba.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Goomba'] = 49
            await db.set(message.author.id, obj)
        }
        else if (cN == 47){
            if (obj.hasOwnProperty('Origami Goomba')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Goomba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941474947530872/origami_goomba.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Goomba'] = 49
            await db.set(message.author.id, obj)
        }
        else if (cN == 48){
            if (obj.hasOwnProperty('Origami Shy Guy')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Shy Guy__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941503674449960/origami_shyguy.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Shy Guy'] = 47
            await db.set(message.author.id, obj)
        }
        else if (cN == 49){
            if (obj.hasOwnProperty('Origami Shy Guy')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Shy Guy__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941503674449960/origami_shyguy.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Shy Guy'] = 47
            await db.set(message.author.id, obj)
        }
        else if (cN == 50){
            if (obj.hasOwnProperty('No face Toad')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __No face Toad__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941805664469063/hole.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['No face Toad'] = 52
            await db.set(message.author.id, obj)
        }
        else if (cN == 51){
            if (obj.hasOwnProperty('12 Colores Pencils')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __12 Colored Pencils__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941776405004348/colored_pencils.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['12 Colored Pencils'] = 51
            await db.set(message.author.id, obj)
        }
        else if (cN == 52){
            if (obj.hasOwnProperty('Cheep Cheep')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Cheep Cheep__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791299491561524/cheep_cheep.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Cheep Cheep'] = 56
            await db.set(message.author.id, obj)
        }
        else if (cN == 53){
            if (obj.hasOwnProperty('Cheep Cheep')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Cheep Cheep__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791299491561524/cheep_cheep.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Cheep Cheep'] = 56
            await db.set(message.author.id, obj)
        }
        else{
            message.channel.send("Unexpected error, please contact Sprinter05")
            console.log(`Error on Free Pack, opened by ${message.author.id}`)
        }
    }
}