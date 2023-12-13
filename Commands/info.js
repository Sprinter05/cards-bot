const { EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription ("This command is to show the information about the bot"),
    async execute(interaction){
        var embed = new EmbedBuilder()
        .setTitle("Paper Mario Card Packs")
        .addFields(
            { name: '•How do packs work?', value: 'Every 8 hours you can get a **Free Pack**. And on the <@292953664492929025> shop you can buy a **Special Pack** for 8.5K <:star_point:710938223664431134> and a **Ultra Rare pack** for 19K <:star_point:710938223664431134>.', inline: false },
            { name: '•Card Types', value: '**Common** (grey), **Rare** (orange) and **Ultra Rare** (pink).', inline: false },
        )
        .setThumbnail('https://cdn.discordapp.com/attachments/727908737393754165/737282550229106778/Icon.png')
        .setFooter({ text: 'Code by Sprinter05 | Card designs by Sprinter05 and tee.'})

        await interaction.reply({embeds: [embed]})
    }
}