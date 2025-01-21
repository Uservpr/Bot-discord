const fs = require('fs');
const path = require('path');



module.exports = {
    async execute(interaction) {
        const EVENT_FILE = path.join(__dirname, '../events.json');
        if (!fs.existsSync(EVENT_FILE)) fs.writeFileSync(EVENT_FILE, JSON.stringify({ events: {} }));
        const eventName = interaction.options.getString('event_name');
        const playerName = interaction.options.getString('player_name');
        const eventData = JSON.parse(fs.readFileSync(EVENT_FILE));

        const event = eventData.events[eventName];
        if (!event) {
            return interaction.reply({
                content: `Event dengan nama "${eventName}" tidak ditemukan.`,
                ephemeral: true,
            });
        }

        // Cek apakah pemain udah terdaftar
        if (event.players.includes(playerName)) {
            return interaction.reply({
                content: `${playerName} sudah terdaftar untuk event "${eventName}".`,
                ephemeral: true,
            });
        }

        // Tambahin pemain
        event.players.push(playerName);
        fs.writeFileSync(EVENT_FILE, JSON.stringify(eventData, null, 2));

        interaction.reply({
            content: `${playerName} berhasil mendaftar untuk event "${eventName}".`,
            ephemeral: true,
        });
    },
};