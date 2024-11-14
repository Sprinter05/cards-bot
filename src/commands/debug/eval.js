const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
const { codeBlock } = require('discord.js');
const { botowner } = require(appRoot + 'config/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription("This command is to evaluate and is only for bot owner.")
    .addStringOption(option =>
      option.setName('cmd')
        .setDescription('Evaluate code')),
  async execute(interaction, cardsdb){
    // ! ONLY the owner CAN evaluate expressions
    if (interaction.member.id !== botowner){
      var evalEmbed = new EmbedBuilder()
        .setDescription("❌ You are not the `Bot Owner` so you can't use this command.")
        .setColor("#f11313")
      await interaction.reply({embeds: [evalEmbed], ephemeral: true});
    } else {
      // Format code block that we are executing
      function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
          return text;
      }
      try { // Try to evaluate the expression
        const toEval = interaction.options.getString('cmd');
        let evaluated = require("util").inspect(eval(toEval, {depth: 0}))
        if (typeof evaluated !== "string"){ // If output not string then we code block it 
          interaction.reply(codeBlock('js', clean(evaluated)));  
        }
      } catch (err) { // Output error (also formatted)
        interaction.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }
}