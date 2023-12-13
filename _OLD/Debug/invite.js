module.exports = {
    name: 'invite',
    description: "This command is to get the temp invite during bot development.",
    execute(message, args, client, Discord, config){
        if (message.author.id !== config.botowner){
            var evalEmbed = new Discord.MessageEmbed()
            .setDescription(":x: You are not the `Bot Owner` so you can't use this command.")
            .setColor("#f11313")
            return message.channel.send(evalEmbed);
        }
        else {
            var inviteEmbed = new Discord.MessageEmbed()
            .setDescription("**Admin:** Click [here](https://discord.com/oauth2/authorize?client_id=897827143772426280&scope=bot&permissions=8)")
            message.channel.send(inviteEmbed);
        }
    }
}