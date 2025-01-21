module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Tidak ada alasan yang diberikan';
        const member = interaction.guild.members.cache.get(user.id);

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: 'Kamu tidak punya izin untuk kick user!', ephemeral: true });
        }

        if (!member) {
            return interaction.reply({ content: 'User tersebut tidak ditemukan di server.', ephemeral: true });
        }

        try {
            await member.kick(reason);
            interaction.reply({ content: `User **${user.tag}** telah di-kick! Alasan: **${reason}**.`, ephemeral: true });
        } catch (err) {
            interaction.reply({ content: 'Gagal meng-kick user.', ephemeral: true });
        }
    },
};