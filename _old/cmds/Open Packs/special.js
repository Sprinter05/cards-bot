module.exports = {
    name: 'special',
    description: "Special Pack",
    async execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints){
        let cN = Math.floor(Math.random() * (58 + 1))
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
        else if (cN == 2){
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
        else if (cN == 3){
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
        else if (cN == 4){
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
        else if (cN == 5){
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
        else if (cN == 6){
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
        else if (cN == 7){
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
        else if (cN == 8){
            if (obj.hasOwnProperty('X-Naut')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __X-Naut__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941565079191592/x-naut.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['X-Naut'] = 28
            await db.set(message.author.id, obj)
        }
        else if (cN == 9){
            if (obj.hasOwnProperty('Watt')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Watt__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941557890023424/watt.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Watt = 29
            await db.set(message.author.id, obj)
        }
        else if (cN == 10){
            if (obj.hasOwnProperty('Kamek')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Kamek__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941435290386462/kamek.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Kamek = 30
            await db.set(message.author.id, obj)
        }
        else if (cN == 11){
            if (obj.hasOwnProperty('Pennington')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Pennington__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941525744746567/pennington.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Pennington = 31
            await db.set(message.author.id, obj)
        }
        else if (cN == 12){
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
        else if (cN == 13){
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
        else if (cN == 14){
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
        else if (cN == 15){
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
        else if (cN == 16){
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
        else if (cN == 17){
            if (obj.hasOwnProperty('Sir Grodus')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Sir Grodus__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941793689468988/grodus.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Sir Grodus'] = 32
            await db.set(message.author.id, obj)
        }
        else if (cN == 18){
            if (obj.hasOwnProperty('Count Bleck')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Count Bleck__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941781932834897/count_bleck.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Count Bleck'] = 33
            await db.set(message.author.id, obj)
        }
        else if (cN == 19){
            if (obj.hasOwnProperty('Shadow Queen')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Shadow Queen__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941981975969842/shadow.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Shadow Queen'] = 34
            await db.set(message.author.id, obj)
        }
        else if (cN == 20){
            if (obj.hasOwnProperty('King Olly')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __King Olly__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941976385093653/olly.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj['King Olly'] = 35
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
        else if (cN == 24){
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
        else if (cN == 25){
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
        else if (cN == 26){
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
        else if (cN == 27){
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
        else if (cN == 28){
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
        else if (cN == 29){
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
        else if (cN == 30){
            if (obj.hasOwnProperty('Flavio')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Flavio__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941395134251058/flavio.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Flavio = 37
            await db.set(message.author.id, obj)
        }
        else if (cN == 31){
            if (obj.hasOwnProperty('Bombette')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bombette__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941384992424016/bombette.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Bombette = 38
            await db.set(message.author.id, obj)
        }
        else if (cN == 32){
            if (obj.hasOwnProperty('Ninji')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Ninji__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941468069003324/ninji.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Ninji = 39
            await db.set(message.author.id, obj)
        }
        else if (cN == 33){
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
        else if (cN == 34){
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
        else if (cN == 35){
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
        else if (cN == 36){
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
        else if (cN == 37){
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
        else if (cN == 38){
            if (obj.hasOwnProperty('Merlon')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Merlon__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941818259701801/merlon.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Merlon = 40
            await db.set(message.author.id, obj)
        }
        else if (cN == 39){
            if (obj.hasOwnProperty('Nastasia')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Nastasia__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941830368657468/nastasia.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Nastasia = 41
            await db.set(message.author.id, obj)
        }
        else if (cN == 40){
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
        else if (cN == 41){
            if (obj.hasOwnProperty('Mr. L')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Mr. L__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941970714394684/mrl.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Mr. L'] = 42
            await db.set(message.author.id, obj)
        }
        else if (cN == 42){
            if (obj.hasOwnProperty('Whacka')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Whacka__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941987827154954/whacka.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Whacka = 43
            await db.set(message.author.id, obj)
        }
        else if (cN == 43){
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
        else if (cN == 44){
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
        else if (cN == 45){
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
        else if (cN == 46){
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
        else if (cN == 47){
            if (obj.hasOwnProperty('12 Colored Pencils')){
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
        else if (cN == 48){
            if (obj.hasOwnProperty('Origami Spike')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Spike__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941510683263066/origami_spike.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Spike'] = 44
            await db.set(message.author.id, obj)
        }
        else if (cN == 49){
            if (obj.hasOwnProperty('Origami Pokey')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Pokey__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941495982096514/origami_pokey.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Pokey'] = 46
            await db.set(message.author.id, obj)
        }
        else if (cN == 50){
            if (obj.hasOwnProperty('Origami Hammer Bro')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Origami Hammer Bro__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941481515941948/origami_hammerbro.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Origami Hammer Bro'] = 48
            await db.set(message.author.id, obj)
        }
        else if (cN == 51){
            if (obj.hasOwnProperty('Captain T.Ode')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Captain T.Ode__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941858739060776/T.Ode.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Captain T.Ode'] = 50
            await db.set(message.author.id, obj)
        }
        else if (cN == 52){
            if (obj.hasOwnProperty('Professor Toad')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Professor Toad__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941847871619172/professor.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Professor Toad'] = 53
            await db.set(message.author.id, obj)
        }
        else if (cN == 53){
            if (obj.hasOwnProperty('Folded Bowser')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Folded Bowser__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/736941965333102652/fold_bowser.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Folded Bowser'] = 54
            await db.set(message.author.id, obj)
        }
        else if (cN == 54){
            if (obj.hasOwnProperty('King Goomba')){
                await dpoints.set(message.author.id, dp += Udp)
                footer = "Duplicated Card! +" + Udp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __King Goomba__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791070059069440/king_goomba.png")
            .setColor("#DB757B")
            .setFooter(footer)

            message.channel.send(embed)
            obj['King Goomba'] = 59
            await db.set(message.author.id, obj)
        }
        else if (cN == 55){
            if (obj.hasOwnProperty('Fracktail')){
                await dpoints.set(message.author.id, dp += Rdp)
                footer = "Duplicated Card! +" + Rdp + " DPoints."
            }

            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Fracktail__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791186081775666/fracktail.png")
            .setColor("#F29658")
            .setFooter(footer)

            message.channel.send(embed)
            obj.Fracktail = 58
            await db.set(message.author.id, obj)
        }
        else if (cN == 56){
            if (obj.hasOwnProperty('Bowser Jr.')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
            
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Bowser Jr.__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791292642525193/bowser_jr.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Bowser Jr.'] = 55
            await db.set(message.author.id, obj)
        }
        else if (cN == 57){
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
        else if (cN == 58){
            if (obj.hasOwnProperty('Lady Bow')){
                await dpoints.set(message.author.id, dp += Fdp)
                footer = "Duplicated Card! +" + Fdp + " DPoints."
            }
             
            var embed = new Discord.MessageEmbed()
            .setTitle("You got __Lady Bow__ card!")
            .setImage("https://media.discordapp.net/attachments/727908737393754165/754791306026418227/lady_bow.png")
            .setColor("#8F8D8E")
            .setFooter(footer)

            message.channel.send(embed)
            obj['Lady Bow'] = 57
            await db.set(message.author.id, obj)
        }
        else{
            message.channel.send("Unexpected error, please contact Sprinter05")
            console.log(`Error on Free Pack, opened by ${message.author.id}`)
        }
    }
}