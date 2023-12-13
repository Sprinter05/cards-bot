module.exports = {
    name: 'eval',
    description: "This command is to evaluate and is only for bot owner.",
    execute(message, args, client, Discord, config, keyv, db, fs, dbpacks, dbcooldown, humanizeDuration){
        if (message.author.id !== config.botowner){
            var evalEmbed = new Discord.MessageEmbed()
            .setDescription("❌ You are not the `Bot Owner` so you can't use this command.")
            .setColor("#f11313")
            return message.channel.send(evalEmbed);
        }
        else {
            function clean(text) {
                if (typeof(text) === "string")
                  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else
                    return text;
              }

              try {
                const code = args.join(" ");
                let evaled = eval(code);
           
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
           
                message.channel.send(clean(evaled), {code:"xl"});
              } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
              }
        }
    }
}