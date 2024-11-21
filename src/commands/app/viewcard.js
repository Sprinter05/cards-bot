const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var { getCardData, checkCardOwn, checkUser } = require(appRoot + 'src/utils/db/queries')
var { Rarity } = require(appRoot + 'src/utils/exporter')

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('viewcard')
        .setDescription ("This command is to view an existing card from the database.")
        .addSubcommand(subcommand =>
            subcommand
                .setName('search-name')
                .setDescription('Search by name')
                .addStringOption(option =>
                  option
                    .setName('card')
                    .setDescription('The name you want to lookup')
                    .setRequired(true)
                )
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('search-id')
                .setDescription('Search by card ID')
                .addIntegerOption(option =>
                  option
                    .setName('id')
                    .setDescription('The id you want to lookup')
                    .setRequired(true)
                    .setMinValue(1) //! Modify if more cards added
                    .setMaxValue(60) //! Modify if more cards added
                )
        ),            
    // Main function
    async execute(interaction, cardsdb){
        // Get information about the card to check
        const opts = interaction.options // Abbreviation
        const cardName = opts.getSubcommand() == 'search-name' ? opts.getString('card') : opts.getInteger('id')
        const outputCard = opts.getSubcommand() == 'search-name' ?
            await getCardData(cardsdb, cardName, false) : await getCardData(cardsdb, cardName, true)
        // Card does not exist
        if (outputCard === null){
            await interaction.reply("This card could not be found!")
            return;
        }

        // Query if the user has the card
        const queryId = await checkUser(cardsdb, interaction.user.id)
        const dbId = queryId === null ? -1 : queryId['user_id']
        const cardOwned = await checkCardOwn(cardsdb, dbId, outputCard['card_id'])

        // Build embed with the necessary information
        const cardColor = Rarity[outputCard['card_rarity_id']].color
        const cardIcon = Rarity[outputCard['card_rarity_id']].icons
        var footerText = ""
        if (cardOwned === true){footerText="You own this card"}
        else {footerText="You don't own this card"}
        var embed = new EmbedBuilder()
            .setTitle(`__${outputCard['card_name']}__`)
            .setImage(outputCard['card_img_url'])
            .setColor(cardColor)
            .setFooter({ text: `ID: ${outputCard['card_id']}  |  ${footerText}` , iconURL: cardIcon})
            
        await interaction.reply({
            embeds: [embed],
        })
    }
}
