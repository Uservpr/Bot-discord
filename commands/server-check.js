const samp = require('samp-query');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'server-check',
  description: 'Cek status server SAMP',
  async execute(interaction) {
    const serverOptions = {
      host: '209.97.162.121', // Ganti dengan IP server SAMP lu
      port: 7011              // Ganti dengan port query server lu
    };

    // Query ke server
    samp(serverOptions, (error, response) => {
      if (error) {
        console.log("Gagal connect:", error);

        // Kasih response error ke user
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(0xff0000) // Warna merah
              .setTitle("Server Offline")
              .setDescription("Server sedang offline atau maintenance")
          ],
          ephemeral: true
        });
      }

      // Respon sukses (tampilkan info server)
      const embed = new EmbedBuilder()
        .setColor(0x00ff00) // Warna hijau
        .setTitle(response.hostname)
        .setDescription(`ramaikan ic guys`)
        .addFields(
          { name: "Mode", value: response.gamemode || "N/A", inline: true },
          { name: "language", value: response.mapname || "N/A", inline: true },
          { name: "map name", value: response.rules.mapname || "N/A" },
          { name: "Players Online", value: `${response.online}/${response.maxplayers}`, inline: false }
        )
        .setFooter({ text: "Powered by Dany dev" });

      // Kirim embed ke channel
      interaction.reply({ embeds: [embed] });
    });
  }
};