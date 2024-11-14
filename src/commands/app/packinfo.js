const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { pacColors, pacEmojis, pacIcons, rarEmojis, cEmoji } = require('../../../config/properties.json');
const { packInfo } = require("../../utils/db/queries");

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
        switch(pack){
            case '1':
                embed.setTitle(`${pacEmojis.fPack} Free Pack`)
                embed.setColor(pacColors.fPack)
                embed.setThumbnail(pacIcons.fPack)
                embed.setDescription("1 Card (No guarantees)")
                break;
            case '2':
                embed.setTitle(`${pacEmojis.sPack} Special Pack`)
                embed.setColor(pacColors.sPack)
                embed.setThumbnail(pacIcons.sPack)
                embed.setDescription("2 Cards (1 Rare guaranteed)")
                break;
            case '3':
                embed.setTitle(`${pacEmojis.urPack} Ultra Rare Pack`)
                embed.setColor(pacColors.urPack)
                embed.setThumbnail(pacIcons.urPack)
                embed.setDescription("3 Cards (1 Ultra Rare guaranteed)")
                break;
            case '4':
                case '3':
                embed.setTitle(`${pacEmojis.ePack} Exclusive Pack`)
                embed.setColor(pacColors.ePack)
                embed.setThumbnail(pacIcons.ePack)
                embed.setDescription("3 Cards (No guarantees)")
                break;
            default:
                break;
        }
        const packDatum = await packInfo(cardsdb, parseInt(pack))
        embed.addFields(
            { name: `${cEmoji} Price:`, value: packDatum['price'].toString() },
            { name: `${rarEmojis.nCard} Normal Card:`, value: packDatum['normal_percentage'] + '%' },
            { name: `${rarEmojis.rCard} Rare Card:`, value: packDatum['rare_percentage'] + '%' },
            { name: `${rarEmojis.urCard} Ultra Rare Card`, value: packDatum['ultrarare_percentage'] + '%' },
            { name: `${rarEmojis.sCard} Special Card:`, value: packDatum['special_percentage'] + '%' }
        )
        await interaction.reply({
            embeds: [embed],
        })
    }
}