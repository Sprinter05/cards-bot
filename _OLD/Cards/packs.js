module.exports = {
    name: 'packs',
    description: "This command is to see your packs",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown){
        let pObj = await dbpacks.get(message.author.id)
        if (pObj == null){
            var jsonObject = {

            }
            await dbpacks.set(message.author.id, jsonObject)
        }

        if (args.length == 0){

            let Dpacks = ""
            let obj = await dbpacks.get(message.author.id)
            if (obj == null || (obj == null && await dbcooldown.get(message.author.id))){
                Dpacks = `<@${message.author.id}> has no packs!`
            }
            if (!await dbcooldown.get(message.author.id)){
                Dpacks += `Free Pack\n`
            }
            if (obj != null){
                for([key, value] of Object.entries(obj).slice(0, 10)) {
                    Dpacks += `${key}\n`
                }
            }
            

            if (Dpacks == ""){
                Dpacks = `<@${message.author.id}> has no packs!`
            }

            var embed = new Discord.MessageEmbed()
            .setTitle(`These are your packs:`)
            .setColor("#18E6E6")
            .setDescription(Dpacks)

            let sent = await message.channel.send(embed)
        }
        else{
            return message.channel.send("Invalid number of arguments\nSyntax is `!packs`")
        }
    }
}