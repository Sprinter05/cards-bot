const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('packinfo')
        .setDescription ("Get information on a pack")
        .addStringOption(option =>
          option
            .setName('pack')
            .setDescription('The pack you want to look at')
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

        /*await interaction.reply({
            embeds: [embed],
        })*/
        await interaction.reply("TBD")
    }
}