const { SlashCommandBuilder } = require("discord.js")
var { packEmbed } = require('../../utils/functionExporter.js')
var { countPacks } = require('../../utils/queries.js')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('packs')
        .setDescription ("This command is to see yours or someone elses packs.")
        .addUserOption(option =>
          option
            .setName('user')
            .setDescription('User to look cards for.')
            .setRequired(false)  
        ),
    // Main function
    async execute(interaction, cardsdb){
        const user = interaction.options.getUser('user') ?? interaction.user;

        if ((await countPacks(cardsdb, user.id)) <= 0){
            if (user.id === interaction.user.id) await interaction.reply("You don't have any packs!");
            else await interaction.reply(`${user.username} doesn't have any packs!`);
            return;
        }

        var embed = await packEmbed(cardsdb, user.id)

        await interaction.reply({
            embeds: [embed],
        })
    }
}