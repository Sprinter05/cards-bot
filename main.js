// Discord imports
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

// npm packages
const fs = require('fs');
const humanizeDuration = require("humanize-duration");
const keyv = require('keyv');

// Import database files
const db =  new keyv('sqlite://./Database/cards.db')
const dbpacks =  new keyv('sqlite://./Database/packs.db')
const dbcooldown =  new keyv('sqlite://./Database/cooldowns.db')
const cooldowns = new keyv('sqlite://./Database/c_ids.db')
const dpoints = new keyv('sqlite://./Database/dpoints.db')

// Setup client and config
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const { token } = require('./config.json');
const path = require('node:path');

// Create commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Run when bot is online
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

// Interact to commands received
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    try { 
        await command.execute(interaction); 
    } catch(error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

// Login using token
client.login(token);
