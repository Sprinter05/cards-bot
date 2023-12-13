module.exports = {
    name: 'clear <1-100 messages>',
    description: "This is to delete a specified amount of messages in the channel you run the command.",
    async execute(message, args, client, Discord, config){
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send("You are missing the `Manage Messages` permission to use this command!")
        }
        else{
            if (args.length != 1){
                return message.channel.send("Invalid number of arguments!\nSyntax is `!clear <1-99 messages>`");
            }   
            else{
                args[0] = parseInt(args[0]);
                if(isNaN(args[0])){
                    return message.channel.send("Invalid type of arguments!\nSyntax is `!clear <1-99 messages>`");
                }
                else{
                    if(args[0] < 1 || args[0] > 99){
                        return message.channel.send("The amount of messages can't be lower than 1 or greater than 99!");
                    }
                    else{
                        args[0] = parseInt(args[0] + 1)
                        await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                            message.channel.bulkDelete(messages)
                        });
                        var messageName;
                        if ((args[0] - 1) === 1){
                            messageName = "message"
                        }
                        else{
                            messageName = "messages"
                        }
                        message.channel.send('Deleted ' + Number(args[0] - 1) + ' ' + messageName + '.')
                        .then(message => {
                            message.delete({ timeout: 1500 })
                        })
                    }
                }
            }
        }
    }
}