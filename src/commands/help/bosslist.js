const { ApplicationCommandOptionType, EmbedBuilder, MessageFlags } = require('discord.js');
const { bosses } = require('../../../config.json');

module.exports = {
    name: 'bosslist',
    description: 'Displays an embed of bosses and their Base stat gain',
    options: [
        { name: "ephemeral", description: "Makes the message vissible only to you!", type: ApplicationCommandOptionType.Boolean, required: false}
    ],

    callback: async (client, interaction) => {
        const isEphemeral = interaction.options.getBoolean("ephemeral") || false;
        
        const bossList = Object.entries(bosses)
            .map(([name, value]) => `**${name}** - ${value.toLocaleString('en-US')}`)
            .join("\n");
        
        const EmbedList = new EmbedBuilder()
            .setTitle("Boss List")
            .setDescription(`## **Boss names and base Stat Gain**\n${bossList}`)
            .setColor("Random")
        await interaction.reply({ embeds:[EmbedList], flags: isEphemeral ? MessageFlags.Ephemeral : 0})
    }
}