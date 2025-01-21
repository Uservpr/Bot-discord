const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { registerCommands } = require('./handlers/interactionHandler');
require('dotenv').config();
const samp = require("samp-query");
const fs = require("fs");



const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('ready', () => {
    console.log(`${client.user.tag} siap melayani!`);
});

// Load interaction handler
registerCommands(client);

client.login(process.env.BOT_TOKEN);