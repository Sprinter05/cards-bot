const Discord = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const config = require('./config.json');
const packages = require('./package.json')
const fs = require('fs');
const humanizeDuration = require("humanize-duration");
const sqlite3 = require('sqlite3').verbose();
const keyv = require('keyv');
const { EmbedBuilder } = require('@discordjs/builders');
const db =  new keyv('sqlite://./Database/cards.db')
const dbpacks =  new keyv('sqlite://./Database/packs.db')
const dbcooldown =  new keyv('sqlite://./Database/cooldowns.db')
const cooldowns = new keyv('sqlite://./Database/c_ids.db')
const dpoints = new keyv('sqlite://./Database/dpoints.db')

client.commands = new Collection();

const commands = []
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once('ready', () => {
    console.log(`Bot is now online,\nLogged as ${client.user.tag}.\nBot is in ${client.guilds.cache.size} ` + `server(s)` + `.`)
    var Logembed = new EmbedBuilder()
        .setTitle(`âœ… Bot is now online!`)
        .setColor(0x53da1f)
        .setTimestamp()
        .setDescription(`Logged as ` + '`' + `${client.user.tag}` + '`' + `.\nBot is in **${client.guilds.cache.size}** ` + `server(s)` + '.')
    client.channels.cache.get("748551379101941851").send({embeds: [Logembed]})
    client.user.setStatus('available')
    client.user.setActivity('!help for commands | !info for Credits', { type: 'WATCHING' })
})

db.on('error', err => {
    console.error('cards.db\nKeyv connection error:', err)
    var Logembed = new EmbedBuilder()
        .setColor(0x11313)
        .setTimestamp()
        .setDescription('âŒ Error connecting to `cards.db`')
    client.channels.cache.get("748551379101941851").send({embeds: [Logembed]})
})

dbpacks.on('error', err => {
    console.error('packs.db\nKeyv connection error:', err)
    var Logembed = new EmbedBuilder()
        .setColor(0x11313)
        .setTimestamp()
        .setDescription('âŒ Error connecting to `packs.db`')
    client.channels.cache.get("748551379101941851").send({embeds: [Logembed]})
})

dbcooldown.on('error', err => {
    console.error('cooldowns.db\nKeyv connection error:', err)
    var Logembed = new EmbedBuilder()
        .setColor(0x11313)
        .setTimestamp()
        .setDescription('âŒ Error connecting to `cooldowns.db`')
    client.channels.cache.get("748551379101941851").send({embeds: [Logembed]})
})

dbcooldown.clear();

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientid, config.guildid),
			{ body: commands },

            Routes.applicationCommands(config.clientid),
	        { body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

client.on(Events.InteractionCreate, async interaction =>{

    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    //const args = message.content.slice(config.prefix.length).split(/ +/);
    if (interaction.commandName === 'info') {
		await command.execute(interaction)
	}

})

client.login(config.token);