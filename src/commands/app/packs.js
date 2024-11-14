const { SlashCommandBuilder } = require("discord.js")
var { packEmbed } = require('../../utils/functionExporter.js')
var { countPacks, checkUser } = require('../../utils/db/queries.js')

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
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']

        const pCount = await countPacks(cardsdb, dbId) ?? 0
        if (pCount <= 0){
            if (user.id === interaction.user.id) await interaction.reply("You don't have any packs!");
            else await interaction.reply(`${user.username} doesn't have any packs!`);
            return;
        }

        const msgEqId = interaction.user.id === user.id ? 0 : user.username
        var embed = await packEmbed(cardsdb, msgEqId, dbId)

        await interaction.reply({
            embeds: [embed],
        })
    }
}