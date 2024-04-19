const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
const { codeBlock } = require('discord.js');
const { botowner } = require('../../config.json')
const fs = require('fs')
const rl = require('readline')
const path = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sqllog')
    .setDescription("This command is to see the SQL log and is only for bot owner.")
    .addIntegerOption(option =>
      option
        .setName('lines')
        .setDescription('Log Lines')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(40)
    ),
  async execute(interaction, cardsdb){
    if (interaction.member.id !== botowner){
      var evalEmbed = new EmbedBuilder()
        .setDescription("❌ You are not the `Bot Owner` so you can't use this command.")
        .setColor("#f11313")
      await interaction.reply({embeds: [evalEmbed], ephemeral: true});
    } else {
      var strLog = []
      var control = 0
      var toRead = interaction.options.getInteger('lines') ?? 10;

      var loc = path.resolve(__dirname, "../../logs/sql.log")
      var text = fs.readFileSync(loc)
      var lines = text.toString().split('\n');
      var maxLine = lines.length - 1;

      const stream = rl.createInterface({
        input: fs.createReadStream(loc)
      })

      stream.on('line', (line) => {
        if (control++ >= maxLine - toRead){
          strLog.push(line)
        }
      })
      stream.on('close', async () => {
        if (strLog.length <= 0) return await interaction.reply("Log is empty!") 
        await interaction.reply(codeBlock('asciidoc', strLog.join('\n')))
      })
    }
  }
}