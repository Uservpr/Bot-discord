module.exports = {
    async execute(interaction) {
        const eventName = interaction.options.getString('nama-event');
        const playerName = interaction.options.getString('nama_ic');
        const guild = interaction.guild;
        const member = interaction.member;

        if (!eventName || !playerName) {
            return interaction.reply({
                content: 'Nama event dan nama IC wajib diisi.',
                ephemeral: true,
            });
        }

        // Cek channel "daftar-event"
        const validChannel = guild.channels.cache.find(
            (c) => c.type === 0 && c.name.toLowerCase() === 'daftar-event'
        );
        if (!validChannel || interaction.channelId !== validChannel.id) {
            return interaction.reply({
                content: 'Command ini hanya bisa digunakan di channel `daftar-event`.',
                ephemeral: true,
            });
        }

        try {
            // Cari role event
            const roleName = `🎁 | event`;
            let eventRole = guild.roles.cache.find((r) => r.name === roleName);

            // Buat role kalau belum ada
            if (!eventRole) {
                eventRole = await guild.roles.create({
                    name: roleName,
                    color: '#00ff00',
                    reason: `Role untuk event ${eventName}`,
                });
            }

            // Assign role ke user
            await member.roles.add(eventRole);

            // Kirim ke channel "list-player-event"
            const listChannel = guild.channels.cache.find(
                (c) => c.type === 0 && c.name.toLowerCase() === 'list-player-event'
            );

            if (!listChannel) {
                return interaction.reply({
                    content: 'Channel `list-player-event` tidak ditemukan.',
                    ephemeral: true,
                });
            }

            await listChannel.send(
                `✅ **${playerName}** telah terdaftar di event **${eventName}**!`
            );

            // Balasan ke user
            interaction.reply(
                `✅ Kamu berhasil terdaftar di event **${eventName}**! Role **${eventRole.name}** telah diberikan.`
            );
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: 'Terjadi kesalahan saat mendaftarkan ke event.',
                ephemeral: true,
            });
        }
    },
};