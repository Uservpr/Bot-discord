module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const member = interaction.guild.members.cache.get(user.id);

        if (!interaction.member.permissions.has('MANAGE_ROLES')) {
            return interaction.reply({ content: 'Kamu tidak punya izin untuk menambahkan role!', ephemeral: true });
        }

        if (member.roles.cache.has(role.id)) {
            return interaction.reply({ content: `User tersebut sudah memiliki role ${role.name}.`, ephemeral: true });
        }

        try {
            await member.roles.add(role);
            interaction.reply({ content: `Role **${role.name}** berhasil ditambahkan ke **${user.tag}**!`, ephemeral: true });
        } catch (err) {
            interaction.reply({ content: 'Terjadi kesalahan saat menambahkan role.', ephemeral: true });
        }
    },
};