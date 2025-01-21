module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);

        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'Kamu tidak punya izin untuk menghapus role!', ephemeral: true });
        }

        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `User tersebut tidak memiliki role ${role.name}.`, ephemeral: true });
        }

        try {
            await member.roles.remove(role);
            interaction.reply({ content: `Role **${role.name}** berhasil dihapus dari **${user.tag}**!`, ephemeral: true });
        } catch (err) {
            interaction.reply({ content: 'Terjadi kesalahan saat menghapus role.', ephemeral: true });
        }
    },
};