module.exports = {
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const location = interaction.options.getString('location');
        const date = interaction.options.getInteger('tanggal');
        const time = interaction.options.getString('jam');
        const hadiahUtama = interaction.options.getString('hadiah-utama');
        const hadiahKedua = interaction.options.getString('hadiah-kedua') || 'Tidak ada';
        const hadiahKetiga = interaction.options.getString('hadiah-ketiga') || 'Tidak ada';
        const guild = interaction.guild;

        if (!name || !description || !location || !date || !time || !hadiahUtama) {
            return interaction.reply({
                content: 'Semua field wajib diisi kecuali hadiah kedua dan ketiga.',
                ephemeral: true,
            });
        }

        try {
            // Cari channel info-event
            const infoChannel = guild.channels.cache.find(
                (c) => c.type === 0 && c.name.toLowerCase() === 'info-event'
            );

            if (!infoChannel) {
                return interaction.reply({
                    content: 'Channel `info-event` tidak ditemukan. Pastikan sudah ada channel ini!',
                    ephemeral: true,
                });
            }

            // Kirim announcement ke info-event
            await infoChannel.send(
                `# 📢 **Event Spesial di ${guild.name}** 

✨ **Deskripsi**: ${description}

### Detail Event:
- **Nama Event**: ${name}
- 📍 **Lokasi**: ${location}
- 📅 **Tanggal**: ${date}
- 🕒 **Jam**: ${time}

### 🎁 Hadiah Menarik:
- 🥇 **Juara Pertama**: ${hadiahUtama}
- 🥈 **Juara Kedua**: ${hadiahKedua}
- 🥉 **Juara Ketiga**: ${hadiahKetiga}

🎯 **Jangan lewatkan kesempatan emas ini!** Ajak teman-temanmu dan siapkan dirimu untuk meraih kemenangan! 🌟
`
            );

            // Balasan ke user
            interaction.reply(`Event **${name}** berhasil diumumkan di channel \`info-event\`!`);
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: 'Terjadi kesalahan saat membuat event. Silakan coba lagi.',
                ephemeral: true,
            });
        }
    },
};