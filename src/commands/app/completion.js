const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
var { Rarity } = require(appRoot + 'src/utils/exporter')
var { checkMissingCards, checkUser, getCardData } = require(appRoot + 'src/utils/db/queries')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('completion')
        .setDescription ("Show all missing cards!"),
    // Main function
    async execute(interaction, cardsdb){
        // User database
        const user = interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId['user_id'] // Bot should have already registered the user
        
        // Get all missing cards for a user
        const missing = await checkMissingCards(cardsdb, dbId)
        const max = Object.keys(missing).length
        if (max === 0){
            return await interaction.reply(
                `Congratulations! You already have all existing cards! :partying_face:`, 
            )
        } else {
            // Get card data for all missing cards
            var missingStr = ''
            for (let i = 0; i < max; i++){
                const name = missing[i].card_name
                const cardData = await getCardData(cardsdb, name, false)
                const emoji = Rarity[cardData['card_rarity_id']].emoji
                missingStr += i + 1 === max ? `${emoji} ${name}` : `${emoji} ${name}, `
            }

            // Put everything into an emebd and display it
            var embed = new EmbedBuilder()
                .setTitle(`You are missing ${max} card(s):`)
                .setDescription(missingStr)
                .setColor('#18E6E6')

            await interaction.reply({
                embeds: [embed],
            })
        }
    }
}