module.exports = {
    async execute(interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'Kamu tidak punya izin untuk mengirim pengumuman!', ephemeral: true });
        }

        const message = interaction.options.getString('message');
        const announcementChannel = interaction.guild.channels.cache.find(channel => channel.name === 'announcement');
        if (!announcementChannel) {
            return interaction.reply({ content: 'Channel `announcement` tidak ditemukan.', ephemeral: true });
        }

        announcementChannel.send(`📢 **Pengumuman:**\n${message}\n\nSpecial Tag: @everyone`);
        interaction.reply({ content: 'Pengumuman berhasil dikirim!', ephemeral: true });
    },
};