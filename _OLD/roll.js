module.exports = {
    name: 'roll <min number> <max number>',
    description: "This rolls a dice between 2 numbers you pick.",
    execute(message, args, client, Discord, config){
        if (args.length != 2){
            return message.channel.send("Invalid number of arguments!\nSyntax is `!roll <min number> <max number>`.");
        }  
        else{
            args[0] = parseInt(args[0])
            args[1] = parseInt(args[1])
                if(isNaN(args[0]) || isNaN(args[1])){
                    return message.channel.send("Invalid type of arguments!\nSyntax is `!roll <min number> <max number>`.");
                }
                else{
                    if (args[0] < 0 || args[1] < 0){
                        return message.channel.send("Numbers given cannot be negative!");
                    }
                    else{
                        if (args[1] < args[0]){
                            return message.channel.send("The maximum number can't be lower than the minimum number!");
                        }
                        else{
                            if (args[0] > 999999999999999 || args[1] > 999999999999999){
                                return message.channel.send(":game_die: You rolled **infinite**.");
                            }
                            else{
                                message.channel.send(":game_die: You rolled a " + Math.floor(Math.random() * (Number(args[1]) - Number(args[0])) + Number(args[0])) + ".");
                            }
                        }
                    }
                }
        }
    }
}