module.exports = {
    name: 'ultra',
    description: "Ultra Rare Pack",
    async execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints){
        let cN = Math.floor(Math.random() * (28 + 1))
        let obj = await db.get(message.author.id)
        let dp = await dpoints.get(message.author.id)
        let footer = ""
        let Fdp = 1
        let Rdp = 3
        let Udp = 5

        if (cN == 0){
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
        else if (cN == 1){
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
        else if (cN == 2){
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
        else if (cN == 3){
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
        else if (cN == 4){
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
        else if (cN == 5){
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
        else if (cN == 6){
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
        else if (cN == 7){
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
        else if (cN == 8){
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
        else if (cN == 9){
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
        else if (cN == 10){
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
        else if (cN == 11){
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
        else if (cN == 12){
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
        else if (cN == 13){
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
        else if (cN == 14){
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
        else if (cN == 15){
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
        else if (cN == 16){
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
        else if (cN == 17){
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
        else if (cN == 18){
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
        else if (cN == 19){
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
        else if (cN == 20){
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
        else if (cN == 21){
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
        else if (cN == 22){
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
        else if (cN == 23){
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
        else if (cN == 24){
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
        else if (cN == 25){
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
        else if (cN == 26){
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
        else if (cN == 27){
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
        else if (cN == 28){
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
        else{
            message.channel.send("Unexpected error, please contact Sprinter05")
            console.log(`Error on Free Pack, opened by ${message.author.id}`)
        }
    }
}