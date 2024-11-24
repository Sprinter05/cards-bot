const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { cEmoji } = require(appRoot + 'config/properties.json');
const { packInfo, rarityInfo } = require(appRoot + "src/utils/db/queries");

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
        var embed = new EmbedBuilder()
        const packDatum = await packInfo(cardsdb, parseInt(pack))
        // Query all rarity information
        const nInfo = await rarityInfo(cardsdb, 1)
        const rInfo = await rarityInfo(cardsdb, 2)
        const urInfo = await rarityInfo(cardsdb, 3)
        const sInfo = await rarityInfo(cardsdb, 4)
        // Put queried data into the embed
        embed.setTitle(`${packDatum['emoji']} ${packDatum['pack_name']}`)
        embed.setDescription(`${packDatum['card_amount']} Cards`)
        embed.setColor(packDatum['color'])
        embed.setThumbnail(packDatum['icon'])
        embed.addFields(
            { name: `${cEmoji} Price:`, value: packDatum['price'].toString() },
            { name: `${nInfo['emoji']} Normal Card:`, value: packDatum['normal_percentage'] + '%' },
            { name: `${rInfo['emoji']} Rare Card:`, value: packDatum['rare_percentage'] + '%' },
            { name: `${urInfo['emoji']} Ultra Rare Card`, value: packDatum['ultrarare_percentage'] + '%' },
            { name: `${sInfo['emoji']} Special Card:`, value: packDatum['special_percentage'] + '%' }
        )
        await interaction.reply({
            embeds: [embed],
        })
    }
}