module.exports = {
    name: 'makeobject',
    description: "JSON dbcards on user ID",
    async execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown){
        if (args.length != 1 && message.author.id != config.botowner){
            return
        }
        else{
            var jsonObject = {

            }
            await db.set(args[0], jsonObject)
            message.channel.send('done')
        }
    }
}