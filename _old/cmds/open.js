module.exports = {
    name: 'open <free pack | special pack | ultra pack>',
    description: "This command is to open a pack.",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown, cooldowns, dpoints){
        
        let pObj = await dbpacks.get(message.author.id)
        let obj = await db.get(message.author.id)
        
        args = args.join(' ')

        if (obj == null){
            var jsonObject = {

            }
            await db.set(message.author.id, jsonObject)
        }

        if (pObj == null){
            var jsonObject = {

            }
            await dbpacks.set(message.author.id, jsonObject)
        }

        let seepoints = await dpoints.get(message.author.id)

        if (seepoints == null){
            await dpoints.set(message.author.id, 0)
            seepoints = 0
        }

        if (args.length == 0){
            return message.channel.send("Invalid number of arguments!\nSyntax is `!open <free pack | special pack | ultra rare pack>`")
        }
        else{
            if (args.toLowerCase() === "free pack"){
                if (await dbcooldown.get(message.author.id)){
                    var cd = await dbcooldown.get(message.author.id)
                    return message.channel.send("You can only open a free pack every 8 hours! Come back in **" + cd + "** hour(s)!")
                }
                else{
                    //client.packs.get('cooldown').execute(fs, message, dbcooldown, cooldowns);
                    client.packs.get('special').execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints);
                }
            }
            else if (args.toLowerCase() === "special pack"){
                if (pObj.hasOwnProperty('Special Pack')) {
                    delete pObj['Special Pack']
                    await dbpacks.set(message.author.id, pObj)
                    client.packs.get('special').execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints);
                }
                else{
                    return message.channel.send("You don't have a **Special Pack**")
                }
            }
            else if (args.toLowerCase() === "ultra rare pack"){
                if (pObj.hasOwnProperty('Ultra Rare Pack')) {
                    delete pObj['Ultra Rare Pack']
                    await dbpacks.set(message.author.id, pObj)
                    client.packs.get('ultra').execute(message, args, client, Discord, config, keyv, db, dbpacks, dpoints);
                }
                else{
                    return message.channel.send("You don't have an **Ultra Rare Pack**")
                }
            }
            else{
                return message.channel.send("Invalid type of pack!\nSyntax is `!open <free pack | special pack | ultra rare pack>`")
            }
        }
    }
}