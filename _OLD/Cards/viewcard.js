module.exports = {
    name: 'viewcard <card name>',
    description: "This command is to view a card.",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks){
        let obj = await db.get(message.author.id)
        if (obj == null){
            var jsonObject = {

            }
            await db.set(message.author.id, jsonObject)
        }
        obj = await db.get(message.author.id)
        let footer = ""
        args = args.join(' ')

        if (args.length == 0){
            return message.channel.send("Invalid number of arguments!\nSyntax is `!viewcard <card name>`")
        }
        else{
            var loading_embed = new Discord.MessageEmbed()
            .setDescription("<a:loading:754801889228357692> Searching...")

            let sent = await message.channel.send(loading_embed)

            if (args.toLowerCase() === "huey"){
                if (obj.hasOwnProperty('Huey')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }

                var embed = new Discord.MessageEmbed()
                .setTitle("__Huey__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941429221359727/huey.png")
                .setColor("#8F8D8E")
                .setFooter("01 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "koopa"){
                if (obj.hasOwnProperty('Koopa')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Koopa__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941447185694770/koopa.png")
                .setColor("#8F8D8E")
                .setFooter("02 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "goomba"){
                if (obj.hasOwnProperty('Goomba')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Goomba__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941410582003742/goomba.png")
                .setColor("#8F8D8E")
                .setFooter("03 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "shy guy"){
                if (obj.hasOwnProperty('Shy guy')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Shy Guy__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941534649253908/shyguy.png")
                .setColor("#8F8D8E")
                .setFooter("04 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "mario"){
                if (obj.hasOwnProperty('Mario')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Mario__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941460963852368/mario.png")
                .setColor("#8F8D8E")
                .setFooter("05 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "luigi"){
                if (obj.hasOwnProperty('Luigi')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Luigi__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941453221036092/luigi.png")
                .setColor("#8F8D8E")
                .setFooter("06 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "vivian"){
                if (obj.hasOwnProperty('Vivian')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Vivian__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941552630497340/vivian.png")
                .setColor("#8F8D8E")
                .setFooter("07 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "tippi"){
                if (obj.hasOwnProperty('Tippi')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Tippi__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941546573922314/tippi.png")
                .setColor("#8F8D8E")
                .setFooter("08 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "x-naut"){
                if (obj.hasOwnProperty('X-Naut')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__X-Naut__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941565079191592/x-naut.png")
                .setColor("#8F8D8E")
                .setFooter("28  - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "watt"){
                if (obj.hasOwnProperty('Watt')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Watt__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941557890023424/watt.png")
                .setColor("#8F8D8E")
                .setFooter("29 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "kamek"){
                if (obj.hasOwnProperty('Kamek')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Kamek__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941435290386462/kamek.png")
                .setColor("#8F8D8E")
                .setFooter("30 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "pennington"){
                if (obj.hasOwnProperty('Pennington')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Pennington__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941525744746567/pennington.png")
                .setColor("#8F8D8E")
                .setFooter("31 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "peach"){
                if (obj.hasOwnProperty('Peach')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Peach__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941841102143570/peach.png")
                .setColor("#F29658")
                .setFooter("09 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "o'chunks"){
                if (obj.hasOwnProperty(`O'Chunks`)){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__O'Chunks__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941770344235119/chunks.png")
                .setColor("#F29658")
                .setFooter("10 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "mimi"){
                if (obj.hasOwnProperty('Mimi')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Mimi__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941824148504666/mimi.png")
                .setColor("#F29658")
                .setFooter("11 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "bowser"){
                if (obj.hasOwnProperty('Bowser')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Bowser__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941764224614410/bowser.png")
                .setColor("#F29658")
                .setFooter("12 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "rawk hawk"){
                if (obj.hasOwnProperty('Rawk Hawk')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Rawk Hawk__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941853001383986/rawk.png")
                .setColor("#F29658")
                .setFooter("13 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "sir grodus"){
                if (obj.hasOwnProperty('Sir Grodus')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Sir Grodus__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941793689468988/grodus.png")
                .setColor("#F29658")
                .setFooter("32 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "count bleck"){
                if (obj.hasOwnProperty('Count Bleck')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Count Bleck__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941781932834897/count_bleck.png")
                .setColor("#F29658")
                .setFooter("33 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "shadow queen"){
                if (obj.hasOwnProperty('Shadow Queen')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Shadow Queen__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941981975969842/shadow.png")
                .setColor("#DB757B")
                .setFooter("34 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "king olly"){
                if (obj.hasOwnProperty('King Olly')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__King Olly__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941976385093653/olly.png")
                .setColor("#DB757B")
                .setFooter("35 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "dimentio"){
                if (obj.hasOwnProperty('Dimentio')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Dimentio__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941954666987520/dimentio.png")
                .setColor("#DB757B")
                .setFooter("36 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "kersti"){
                if (obj.hasOwnProperty('Kersti')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Kersti__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941441007353866/kersti.png")
                .setColor("#8F8D8E")
                .setFooter("14 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "goombario"){
                if (obj.hasOwnProperty('Goombario')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Goombario__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941416457961552/goombario.png")
                .setColor("#8F8D8E")
                .setFooter("15 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "goombella"){
                if (obj.hasOwnProperty('Goombella')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Goombella__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941422837497917/goombella.png")
                .setColor("#8F8D8E")
                .setFooter("16 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "bobbery"){
                if (obj.hasOwnProperty('Bobbery')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Bobbery__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941380307255306/bobbery.png")
                .setColor("#8F8D8E")
                .setFooter("17 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "gonzales"){
                if (obj.hasOwnProperty('Gonzales')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Gonzales__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941405439655956/gonzales.png")
                .setColor("#8F8D8E")
                .setFooter("18 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "parakarry"){
                if (obj.hasOwnProperty('Parakarry')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Parakarry__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941518853505114/parakarry.png")
                .setColor("#8F8D8E")
                .setFooter("19 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "doopliss"){
                if (obj.hasOwnProperty('Doopliss')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Doopliss__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941389203505182/doopliss.png")
                .setColor("#8F8D8E")
                .setFooter("20 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "flurrie"){
                if (obj.hasOwnProperty('Flurrie')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Flurrie__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941399911563365/flurrie.png")
                .setColor("#8F8D8E")
                .setFooter("21 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "flavio"){
                if (obj.hasOwnProperty('Flavio')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Flavio__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941395134251058/flavio.png")
                .setColor("#8F8D8E")

                .setFooter("37 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "bombette"){
                if (obj.hasOwnProperty('Bombette')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Bombette__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941384992424016/bombette.png")
                .setColor("#8F8D8E")
                .setFooter("38 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "ninji"){
                if (obj.hasOwnProperty('Ninji')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Ninji__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941468069003324/ninji.png")
                .setColor("#8F8D8E")
                .setFooter("39 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "francis"){
                if (obj.hasOwnProperty('Francis')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Francis__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941788228616222/francis.png")
                .setColor("#F29658")
                .setFooter("22 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "kammy koopa"){
                if (obj.hasOwnProperty('Kammy Koopa')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Kammy Koopa__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941811918176326/kammy.png")
                .setColor("#F29658")
                .setFooter("23 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "grubba"){
                if (obj.hasOwnProperty('Grubba')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Grubba__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941799909621800/grubba.png")
                .setColor("#F29658")
                .setFooter("24 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "bobby"){
                if (obj.hasOwnProperty('Bobby')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Bobby__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941758532943972/bobby.png")
                .setColor("#F29658")
                .setFooter("25 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "olivia"){
                if (obj.hasOwnProperty('Olivia')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Olivia__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941836375031858/olivia.png")
                .setColor("#F29658")
                .setFooter("26 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "merlon"){
                if (obj.hasOwnProperty('Merlon')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Merlon__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941818259701801/merlon.png")
                .setColor("#F29658")
                .setFooter("40 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "nastasia"){
                if (obj.hasOwnProperty('Nastasia')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Nastasia__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941830368657468/nastasia.png")
                .setColor("#F29658")
                .setFooter("41 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "eldstar"){
                if (obj.hasOwnProperty('Eldstar')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Eldstar__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941959654015057/eldstar.png")
                .setColor("#DB757B")
                .setFooter("27 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "mr. l"){
                if (obj.hasOwnProperty('Mr. L')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Mr. L__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941970714394684/mrl.png")
                .setColor("#DB757B")
                .setFooter("42 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "whacka"){
                if (obj.hasOwnProperty('Whacka')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Whacka__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941987827154954/whacka.png")
                .setColor("#DB757B")
                .setFooter("43- " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami koopa"){
                if (obj.hasOwnProperty('Origami Koopa')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Koopa__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941487530573850/origami_koopa.png")
                .setColor("#8F8D8E")
                .setFooter("45 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami goomba"){
                if (obj.hasOwnProperty('Origami Goomba')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Goomba__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941474947530872/origami_goomba.png")
                .setColor("#8F8D8E")

                .setFooter("49 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami shy guy"){
                if (obj.hasOwnProperty('Origami Shy Guy')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Shy Guy__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941503674449960/origami_shyguy.png")
                .setColor("#8F8D8E")
                .setFooter("47 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "no face toad"){
                if (obj.hasOwnProperty('No face Toad')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__No face Toad__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941805664469063/hole.png")
                .setColor("#F29658")
                .setFooter("52 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "12 colored pencils"){
                if (obj.hasOwnProperty('12 Colored Pencils')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__12 Colored Pencils__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941776405004348/colored_pencils.png")
                .setColor("#F29658")
                .setFooter("51 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami spike"){
                if (obj.hasOwnProperty('Origami Spike')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Spike__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941510683263066/origami_spike.png")
                .setColor("#8F8D8E")
                .setFooter("44 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami pokey"){
                if (obj.hasOwnProperty('Origami Pokey')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Pokey__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941495982096514/origami_pokey.png")
                .setColor("#8F8D8E")
                .setFooter("46 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami hammer bro"){
                if (obj.hasOwnProperty('Origami Hammer Bro')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Hammer Bro__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941481515941948/origami_hammerbro.png")
                .setColor("#8F8D8E")
                .setFooter("48 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "captain t.ode"){
                if (obj.hasOwnProperty('Captain T.Ode')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Captain T.Ode__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941858739060776/T.Ode.png")
                .setColor("#F29658")
                .setFooter("52 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "professor toad"){
                if (obj.hasOwnProperty('Professor Toad')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Professor Toad__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941847871619172/professor.png")
                .setColor("#F29658")
                .setFooter("53 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "folded bowser"){
                if (obj.hasOwnProperty('Folded Bowser')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Folded Bowser__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736941965333102652/fold_bowser.png")
                .setColor("#DB757B")
                .setFooter("54 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "king goomba"){
                if (obj.hasOwnProperty('King Goomba')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__King Goomba__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/754791070059069440/king_goomba.png")
                .setColor("#DB757B")
                .setFooter("59 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "fracktail"){
                if (obj.hasOwnProperty('Fracktail')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Fracktail__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/754791186081775666/fracktail.png")
                .setColor("#F29658")
                .setFooter("58 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "bowser jr."){
                if (obj.hasOwnProperty('Bowser Jr.')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Bowser Jr.__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/754791292642525193/bowser_jr.png")
                .setColor("#8F8D8E")
                .setFooter("55 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "cheep cheep"){
                if (obj.hasOwnProperty('Cheep Cheep')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Cheep Cheep__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/754791299491561524/cheep_cheep.png")
                .setColor("#8F8D8E")
                .setFooter("56 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "lady bow"){
                if (obj.hasOwnProperty('Lady Bow')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Lady Bow__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/754791306026418227/lady_bow.png")
                .setColor("#8F8D8E")
                .setFooter("57 - " + footer)

                await sent.edit(embed)
            }
            else if (args.toLowerCase() === "origami peach"){
                if (obj.hasOwnProperty('Origami Peach')){
                    footer = "You own this card"
                }
                else{
                    footer = "You don't own this card"
                }
                
                var embed = new Discord.MessageEmbed()
                .setTitle("__Origami Peach__")
                .setImage("https://media.discordapp.net/attachments/727908737393754165/736942043062075402/Origami_Peach.png")
                .setColor("#F2CF44")
                .setFooter("60 - " + footer)

                await sent.edit(embed)
            }
            else{
                var noresult_embed = new Discord.MessageEmbed()
                .setDescription("No cards were found :(")
                return await sent.edit(noresult_embed)
            }
        }
    }
}