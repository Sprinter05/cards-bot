// ? Remove JSON object on queries
// TODO: Open command

// Discord and command imports
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const { checkUser } = require('./utils/db/queries')
const { logUser } = require('./utils/db/manips')

// npm packages
const fs = require('fs');

// Get date and time
const currDate = new Date();
const cDay = ('0' + currDate.getDate()).slice(-2);
const cMonth = ('0' + (currDate.getMonth() + 1)).slice(-2)
const cYear = currDate.getFullYear();
const cHour = ('0' + currDate.getHours()).slice(-2)
const cMinutes = ('0' + currDate.getMinutes()).slice(-2)
const cSeconds = ('0' + currDate.getSeconds()).slice(-2)
const dateString = `${cDay}-${cMonth}-${cYear} at ${cHour}:${cMinutes}:${cSeconds}`;

// Database
const Sequelize = require('sequelize');
const { database } = require("../config/config.json")
const seqLog = fs.createWriteStream('logs/sql.log', {'flags': 'a'});
seqLog.write(`[LOG] Starting in ${dateString}\n`)
const cardsdb = new Sequelize(database.dbName, database.dbUser, database.dbPswd, {
    host: database.ip,
    dialect: 'mysql',
    logging: (msg) => {
		const cmdTime = new Date();
		const cmdHrs = ('0' + cmdTime.getHours()).slice(-2)
		const cmdMins = ('0' + cmdTime.getMinutes()).slice(-2)
		const cmdSecs = ('0' + cmdTime.getSeconds()).slice(-2)
		seqLog.write(`\t> ${msg} [${cmdHrs}:${cmdMins}:${cmdSecs}]\n`)
	}
})

// Login into database
cardsdb.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// Setup client and config
const client = new Client(
	{ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.MessageContent] }
);
const { token } = require('../config/config.json');
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

// Interact to commands received
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
	const cardCmds = fs.readdirSync(path.join(__dirname, 'commands/app'))
    try {
		// Check if command is cards related and if user is in the users database 
		if (cardCmds.includes(interaction.commandName.concat('.js')) && (await checkUser(cardsdb, interaction.user.id)) === null ){
			if (interaction.commandName === 'reset_data') return await interaction.reply({ content: "You have no data to reset!", ephemeral: true });
			logUser(cardsdb, interaction.user.id)
		}
		//if (interaction.commandName === 'reset_data' && interaction.guild) return await interaction.reply({ content: "You can only reset your data in the bot's DMs", ephemeral: true }); 
        await command.execute(interaction, cardsdb);
    } catch(error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

// Event handling
const eventsPath = path.join(__dirname, 'utils/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, cardsdb));
	} else {
		client.on(event.name, (...args) => event.execute(...args, cardsdb));
	}
}

// Login using token
client.login(token);
