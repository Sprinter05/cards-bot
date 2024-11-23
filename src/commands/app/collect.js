const { SlashCommandBuilder } = require("discord.js");
var { getFreePackCooldown, checkUser } = require(appRoot + 'src/utils/db/queries')
var { newFreePackCooldown, addPack } = require(appRoot + 'src/utils/db/manips')

// Format remaining time
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

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
        const timestamp = await getFreePackCooldown(cardsdb, dbId)
        const currStamp = Date.now() / 1000
        
        if (currStamp >= timestamp){
            // Claim the new Free Pack
            addPack(cardsdb, dbId, 'Free Pack', 1)
            const nextFPack = await newFreePackCooldown(cardsdb, dbId)
            const remaining = nextFPack - currStamp
            const displayStr = secondsToHms(remaining)
            return await interaction.reply(
                `Succesfully claimed a new **Free Pack**!\nNext one will be available in __${displayStr}__!`, 
            )
        } else {
            const remaining = timestamp - currStamp
            const displayStr = secondsToHms(remaining)
            // Next available pack is not yet available
            return await interaction.reply(
                `You have already claimed a **Free Pack**!\nNext one will be available in __${displayStr}__!`, 
            )
        }
    }
}