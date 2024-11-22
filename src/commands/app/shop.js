const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Packs } = require("../../utils/exporter");
var { packInfo, checkMoney, checkUser } = require(appRoot + 'src/utils/db/queries')
var { updateMoney, addPack } = require(appRoot + 'src/utils/db/manips')
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
                        {name: 'Special Pack', value: '2'},
                        {name: 'Ultra Rare Pack', value: '3'},
                        {name: 'Exclusive Pack', value: '4'},
                    )
                )
                .addIntegerOption(option =>
                    option
                      .setName('amount')
                      .setDescription('How many packs you want to buy')
                      .setRequired(false)
                      .setMinValue(1)
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
            for (let i = 2; i <= 4; i++) {
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
        } else {
            // Pack to buy
            const pack = interaction.options.getString('pack');
            const amount = interaction.options.getInteger('amount') ?? 1
            // User database
            const user = interaction.user;
            const queryId = await checkUser(cardsdb, user.id)
            const dbId = queryId['user_id'] // Bot should have already registered the user    
            
            // Get price information about the pack
            const money = await checkMoney(cardsdb, dbId);
            const info = await packInfo(cardsdb, pack)
            const name = Object.keys(Packs).find(key => Packs[key].id === pack)
            const total = info['price'] * amount

            // Not enough money to buy
            if (money < total) {
                await interaction.reply({ 
                    content: `You don't have enough money to buy that! You need ${total} ${cEmoji}!`, 
                    ephemeral: true 
                })
                return
            }
            
            // Modify the user's money and add the pack to their database
            updateMoney(cardsdb, dbId, -total)
            addPack(cardsdb, dbId, name, amount)
            return await interaction.reply(`Successfully bought x${amount} ${name}!`)
        }
    }
}