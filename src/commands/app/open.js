const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { pacColors, pacEmojis, pacIcons, rarEmojis, cEmoji } = require('../../../config/properties.json');
const { packInfo } = require("../../utils/db/queries");

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('open')
        .setDescription ("Open a cards pack")
        .addStringOption(option =>
          option
            .setName('pack')
            .setDescription('The pack you want to open')
            .setRequired(true)
            .addChoices(
                {name: 'Free Pack', value: '1'},
                {name: 'Special Pack', value: '2'},
                {name: 'Ultra Rare Pack', value: '3'},
                {name: 'Exclusive Pack', value: '4'},
            )
        ),
    // Main function
    async execute(interaction, cardsdb){
        var pack = interaction.options.getString('pack');
                
    }
}