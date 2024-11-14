const { SlashCommandBuilder, EmbedBuilder, codeBlock } = require("discord.js")
const { botowner } = require('../../../config/config.json');
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
    ),
  async execute(interaction, cardsdb){
    // ! ONLY the owner SHOULD read the SQL logs
    if (interaction.member.id !== botowner){
      var evalEmbed = new EmbedBuilder()
        .setDescription("❌ You are not the `Bot Owner` so you can't use this command.")
        .setColor("#f11313")
      await interaction.reply({embeds: [evalEmbed], ephemeral: true});
    } else {
      // Get the n last entries (by default 10) on the SQL logs
      var strLog = []
      var control = 0
      var toRead = interaction.options.getInteger('lines') ?? 10;
      // Read the contents of the log file
      var loc = path.resolve(__dirname, "../../logs/sql.log")
      var text = fs.readFileSync(loc)
      var lines = text.toString().split('\n');
      var maxLine = lines.length - 1;
      // Create a stream to read the incoming bytes
      const stream = rl.createInterface({
        input: fs.createReadStream(loc)
      })
      // Push lines into the buffer until we have reached the n we want to show
      stream.on('line', (line) => {
        if (control++ >= maxLine - toRead){
          strLog.push(line)
        }
      })
      stream.on('close', async () => {
        // ? Empty log should never happen theoretically
        if (strLog.length <= 0) return await interaction.reply("Log is empty!")
        try {
          // Show the log in a code block
          await interaction.reply({content: codeBlock('asciidoc', strLog.join('\n')), ephemeral: true })
        } catch(e) { await interaction.reply({content: "Text is too big!", ephemeral:true })}
      })
    }
  }
}