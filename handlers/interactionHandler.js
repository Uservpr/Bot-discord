const { REST, Routes, InteractionType } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Register slash commands
async function registerCommands(client) {
    const commands = require('../config/commands.json');

    try {
        console.log('Registering slash commands...');
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands });
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error('Failed to register commands:', error);
    }

    client.on('interactionCreate', async (interaction) => {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        const commandName = interaction.commandName;
        const commandFile = path.join(__dirname, `../commands/${commandName}.js`);

        if (fs.existsSync(commandFile)) {
            const command = require(commandFile);
            await command.execute(interaction);
        } else {
            interaction.reply({ content: 'Command tidak ditemukan.', ephemeral: true });
        }
    });
}

module.exports = { registerCommands };