const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
var { getFreePackCooldown, checkUser } = require(appRoot + 'src/utils/db/queries')
var { newFreePackCooldown, addPack } = require(appRoot + 'src/utils/db/manips')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('collect')
        .setDescription ("Collect a Free Pack!"),
    // Main function
    async execute(interaction, cardsdb){
        // User database
        const user = interaction.user;
        const queryId = await checkUser(cardsdb, user.id)
        const dbId = queryId['user_id'] // Bot should have already registered the user    
        
        // Get when the user can open a new free pack
        const timestamp = (await getFreePackCooldown(cardsdb, dbId))['free_pack_cooldown']
        const currStamp = Date.now() / 1000

        if (currStamp >= timestamp){
            // Claim the new Free Pack
            addPack(cardsdb, dbId, 'Free Pack', 1)
            const nextFPack = await newFreePackCooldown(cardsdb, dbId)
            const displayDate = new Date(nextFPack * 1000).toUTCString()
            return await interaction.reply(
                `Succesfully claimed a new **Free Pack**!\nNext one will be available at __${displayDate}__!`, 
            )
        } else {
            // Next available pack is not yet available
            const displayDate = new Date(timestamp).toUTCString()
            return await interaction.reply(
                `You have already claimed a **Free Pack**!\nNext one will be available at __${displayDate}__!`, 
            )
        }
    }
}