const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
const { codeBlock } = require('discord.js');
const { botowner } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription("This command is to evaluate and is only for bot owner.")
    .addStringOption(option =>
      option.setName('cmd')
        .setDescription('Evaluate code')),
  async execute(interaction, cardsdb){
    if (interaction.member.id !== botowner){
      var evalEmbed = new EmbedBuilder()
        .setDescription("❌ You are not the `Bot Owner` so you can't use this command.")
        .setColor("#f11313")
      await interaction.reply({embeds: [evalEmbed], ephemeral: true});
    } else {
      function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
          return text;
      }
      try {
        const toEval = interaction.options.getString('cmd');
        let evaluated = require("util").inspect(eval(toEval, {depth: 0}))
        if (typeof evaled !== "string"){
          interaction.reply(codeBlock('js', clean(evaluated)));  
        }
      } catch (err) {
        interaction.reply(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }
}