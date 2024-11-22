const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Packs } = require("../../utils/exporter");
var { packInfo } = require(appRoot + 'src/utils/db/queries')
var { scrapeCard, scrapeCollection, updateMoney } = require(appRoot + 'src/utils/db/manips')
var { cEmoji } = require(appRoot + 'config/properties.json');

module.exports = {
    // Define data to export to Discord
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription ("Buy card packs!")
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription('View the available offers')
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('buy')
                .setDescription('Buy a card pack')
                .addStringOption(option =>
                    option
                      .setName('pack')
                      .setDescription('Pack to buy')
                      .setRequired(true)
                      .addChoices(
                        {name: 'Free Pack', value: '1'},
                        {name: 'Special Pack', value: '2'},
                        {name: 'Ultra Rare Pack', value: '3'},
                        {name: 'Exclusive Pack', value: '4'},
                    )
            )
        ),
    // Main function
    async execute(interaction, cardsdb){
        // See if the user wants to see the shop or buy something
        const opts = interaction.options // Abbreviation
        const showShop = opts.getSubcommand() === 'view' ? true : false

        // Show the shop embed
        if (showShop){
            var embed = new EmbedBuilder()
            // Generic properties
            embed.setTitle(`:shopping_bags: Pack Shop`)
            embed.setColor('#EA87ED')
            embed.setDescription("Available Packs:")
            embed.setThumbnail('https://www.models-resource.com/resources/big_icons/70/69837.png?updated=1717226909')

            // Packs to buy
            for (let i = 1; i <= 4; i++) {
                const info = await packInfo(cardsdb, i);    
                const name = Object.keys(Packs).find(key => Packs[key].id === i.toString())          
                const emoji = Packs[name].emoji
                embed.addFields(
                    { name: `${emoji} ${name}:`, value: `${info['price'].toString()} ${cEmoji}`}
                )
            }

            // Show embed
            await interaction.reply({
                embeds: [embed],
            })
        }
    }
}