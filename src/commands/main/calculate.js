const { ApplicationCommandOptionType, EmbedBuilder, MessageFlags, Message } = require('discord.js');
const { bosses } = require('../../../config.json');

module.exports = {
    name: 'calculate',
    description: 'Calculates the info given by the user',
    options: [
        { name: "rebirths", description: "Rebirths to calculate", type: ApplicationCommandOptionType.Integer, required: true},
        { name: "talents", description: "If you have 2x Permanent gamepass from shop", type: ApplicationCommandOptionType.Boolean, required: true},
        { name: "boost", description: "Global Booster to calculate", type: ApplicationCommandOptionType.Integer, required: true, choices: [
            { name: 'None', value: 0 },
            { name: '2x', value: 2 },
            { name: '3x', value: 3 },
            { name: "4x", value: 4 },
            { name: '5x', value: 5 },
        ]},
        { name: "boss", description: "Boss to Get info", type: ApplicationCommandOptionType.String, required: true},
    ],

    callback: async (client, interaction) => {
        const rebirths = interaction.options.get('rebirths').value;
        const talents = interaction.options.get('talents').value;
        const boost = interaction.options.get('boost').value;
        const bossSelect = interaction.options.get('boss').value;

        const bossSelectLower = bossSelect.toLowerCase();
        const bossKey = Object.keys(bosses).find(boss => boss.toLowerCase() == bossSelectLower);

        if (!bossKey) {
            return interaction.reply({ content: "Invalid Boss Selection. Please use /bosslist to see the bosses", flags: MessageFlags.Ephemeral });
        }

        const bossBaseStats = bosses[bossKey];

        const boostDes = () => {
            if (boost == 0) return "None";
            if (boost == 2) return "2x";
            if (boost == 3) return "3x";
            if (boost == 4) return "4x";
            if (boost == 5) return "5x";
        };
        // Checks if rebirths are valid
        if (rebirths < 0) {
            return interaction.reply({
                content: "Please use a valid value for rebirths!",
                flags: MessageFlags.Ephemeral
            });
        }
        // Gets the base multiplier
        const baseMultiplier = 1 + (rebirths * 0.5);

        // Define the total multiplier
        let totalMultiplier = baseMultiplier;

        // Step 1: Talents
        if (talents == true) totalMultiplier += baseMultiplier;

        // Step 2: Global Boost
        if (boost == 2) totalMultiplier += baseMultiplier;
        if (boost == 3) totalMultiplier += (2 * baseMultiplier);
        if (boost == 4) totalMultiplier += (3 * baseMultiplier);
        if (boost == 5) totalMultiplier += (4 * baseMultiplier);

        // Gets the final stats
        const finalStats = totalMultiplier * bossBaseStats;
        const punchstr = (totalMultiplier * 30).toLocaleString('en-US');
        const punchspd = (totalMultiplier * 15).toLocaleString('en-US');
        const abs = (totalMultiplier * 120).toLocaleString('en-US');
        const speed = (totalMultiplier * 22.5).toLocaleString('en-US');

        // Gets stats needed for Rebirth
        function getRebStats() {
            if (rebirths <= 9) {
                let reb = ((rebirths * 1000000) + 500000);
                return reb.toLocaleString('en-US');
            } else if (rebirths > 9) {
                const stats = (500000 + (rebirths * 1000000));
                return stats.toLocaleString('en-US');
            }
            // const m = 2000000
            // const statToReb = Math.floor(m * rebirths - 8000000).toLocaleString('en-US');
        };


        // Create an embed and respond with it
        const embedResponse = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Calculation`)
            .setDescription(`## Inputs\n**Rebirths: ${rebirths.toLocaleString('en-US')}**\n**Talents: ${talents.toString()}**\n**Boost: ${boostDes()}**\n## Calculation`)
            .addFields(
                { name: `${bossKey}:`, value: `<:aquastar:1346201647432470588> ${finalStats.toLocaleString('en-US')}`, inline: true },
                { name: `Stats to Rebirth:`, value: `<:purplecube:1346201612837847122> ${getRebStats().toString()}`, inline: true },
                { name: `Punch Gain:`, value: `<:redgem:1346201700150808691> Strength: ${punchstr}\n<:bluegem:1346201659197489162> Speed: ${punchspd}`, inline: true },
                { name: `Ki Blast:`, value: `<:yellowgem:1346201685537722388> ${punchstr}`, inline: true },
                { name: `Defense:`, value: `<:greencube:1346201710518992999> ${abs}`, inline: true },
                { name: `Aura Boost:`, value: `<:bluegem:1346201659197489162> ${speed} Speed/s`, inline: true })
            .setThumbnail(interaction.user.avatarURL())
            .setColor('Random');

        await interaction.reply({ embeds: [embedResponse] });
    },
}
