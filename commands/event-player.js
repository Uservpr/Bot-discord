module.exports = {
    async execute(interaction) {
        const eventName = interaction.options.getString('event_name');
        const eventData = JSON.parse(fs.readFileSync(EVENT_FILE));

        if (!eventData.events[eventName]) {
            return interaction.reply({
                content: `Event dengan nama "${eventName}" tidak ditemukan.`,
                ephemeral: true,
            });
        }

        const players = eventData.events[eventName].players;
        if (players.length === 0) {
            return interaction.reply({ content: `Belum ada yang mendaftar di event "${eventName}".` });
        }

        interaction.reply(`List pemain di event "${eventName}":\n- ${players.join('\n- ')}`);
    },
};