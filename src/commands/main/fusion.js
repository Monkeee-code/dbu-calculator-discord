const {EmbedBuilder, ApplicationCommandOptionType, MessageFlags} = require('discord.js');

module.exports = {
    name: 'fusion',
    description: 'Calculate fusion results between two players.',
    options: [
        { name: 'player1', description: 'Stats of the player in control', type: ApplicationCommandOptionType.Integer, required: true },
        { name: 'player2', description: 'Stats of the player being fused', type: ApplicationCommandOptionType.Integer, required: true },
        { name: 'ephemeral', description: 'Make the response visible only to you', type: ApplicationCommandOptionType.Boolean, required: false}
    ],
    guildOnly: true,
    callback: async (client, interaction) => {
        const player1 = interaction.options.getInteger('player1');
        const player2 = interaction.options.getInteger('player2');
        const isEphemeral = interaction.options.getBoolean('ephemeral') || false;

        if (player1 < 0 || player2 < 0) {
            return interaction.reply({ content: 'Stats must be non-negative integers.', ephemeral: MessageFlags.Ephemeral });
        }
        let Mult = 0;

        if (player1 - player1*0.5 > player2 || player2 > player1 + player1*0.5 && player1 - player1*0.5 < player2 || player2 < player1 + player1*0.5) {
        Mult = 0.8;
        }; if (player1 - player1*0.3 < player2 && player2 < player1 + player1*0.3 && player2 - player2*0.3 < player1 && player1 < player2 + player2*0.3) {
        Mult = 1.2;
        }; if (player1 - player1*0.1 < player2 && player2 < player1 + player1*0.1 && player2 - player2*0.1 < player1 && player1 < player2 + player2*0.1) {
        Mult = 1.5;
        }
        const result = player1 * Mult;
        const embed = new EmbedBuilder()
            .setTitle(`Fusion Result - ${interaction.user.username}`)
            .setColor('Random')
            .addFields(
                { name: "player1's Stats", value: `${player1.toLocaleString('en-US')} <:bluegem:1346201659197489162>`, inline: true },
                { name: "player2's Stats", value: `${player2.toLocaleString('en-US')} <:redgem:1346201700150808691>`, inline: true },
                { name: 'Resulting Multiplier', value: `${result.toLocaleString('en-US')} <:yellowgem:1346201685537722388>`, inline: false },
            )
            .setTimestamp()
            .setThumbnail(interaction.user.avatarURL());

        interaction.reply({ embeds: [embed], flags: isEphemeral ? MessageFlags.Ephemeral : 0});
    }
}