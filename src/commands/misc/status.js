const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryTypes } = require('sequelize');
const { dependencies, version } = require('../../../package.json')

function format(seconds){
    function pad(s){
      return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60*60));
    var minutes = Math.floor(seconds % (60*60) / 60);
    var seconds = Math.floor(seconds % 60);
  
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription ("Fetch bot status"),
    async execute(interaction, cardsdb){        
        let memoryUsage = Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100
        let nodeVersion = process.version.replace('v', '')
        let djsVersion = dependencies['discord.js'].replace('^', '')
        //let sqlVersion = dependencies['mysql2'].replace('^', '')
        //let sequelizeVersion = dependencies['sequelize'].replace('^', '')
        let uptime = format(process.uptime())
        let sizeQuery = await cardsdb.query(
            `SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size FROM information_schema.TABLES GROUP BY table_schema;`,
            {type: QueryTypes.SELECT, plain: true}
        )
        let dbSize = `${sizeQuery.size}MB`

        var embed = new EmbedBuilder()
            .setAuthor({ name: `Cards Bot`, iconURL: interaction.client.user.avatarURL()})
            .setTitle("Cards-Bot Status")
            .addFields(
                { name: 'Bot Version:', value: version, inline: true },
                { name: 'Node.js Version:', value: nodeVersion, inline: true },
                { name: 'Discord.js Version:', value: djsVersion, inline: true },
                //{ name: 'MySQL2 Version:', value: sqlVersion, inline: true },
                //{ name: 'Sequelize Version:', value: sequelizeVersion, inline: true },
                { name: 'Database Size:', value: dbSize, inline: true },
                { name: 'Memory Usage:', value: memoryUsage + 'MB', inline: true },
		        { name: 'Uptime:', value: uptime, inline: true },
            )

        await interaction.reply({embeds: [embed]})
    }
}