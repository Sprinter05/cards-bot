// Discord and command imports
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { checkUser } = require('./utils/queries')
const { logUser } = require('./utils/manips')

// Database
const Sequelize = require('sequelize');
const { database } = require("./config.json")
const cardsdb = new Sequelize(database.dbName, database.dbUser, database.dbPswd, {
    host: database.ip,
    dialect: 'mysql',
    logging: false,
})

// Login into database
cardsdb.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

// npm packages
const fs = require('fs');

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

// Interact to commands received
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
	const cardCmds = fs.readdirSync(path.join(__dirname, 'commands/cards'))
    try {
		// Check if command is cards related and if user is in the users database 
		if (cardCmds.includes(interaction.commandName.concat('.js')) && (await checkUser(cardsdb, interaction.user.id)).length === 0 ){
			logUser(cardsdb, interaction.user.id)
		}
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
