const { ApplicationCommandOptionType, MessageFlags } = require('discord.js');
const db = require('../../db');


module.exports = {
    name: 'storerebs',
    description: 'Store Rebirths for later use',
    options: [
        { name: "rebirths", description: "Rebirths to store", type: ApplicationCommandOptionType.Integer, required: true },
    ],
    callback: async (client, interaction) => {
        const rebirths = interaction.options.get('rebirths').value;

        // Validate rebirths
        if (rebirths < 0) {
            return interaction.reply({
                content: "Please use a valid value for rebirths!",
                flags: MessageFlags.Ephemeral
            });
        }

        // Store the rebirths in the database
        try {
            const [result] = await db.query('INSERT INTO users (user_id, rebirths) VALUES (?, ?) ON DUPLICATE KEY UPDATE rebirths = ?', [interaction.user.id, rebirths, rebirths]);
            if (result.affectedRows > 0) {
                return interaction.reply({ content: `Successfully stored ${rebirths} rebirths!`, flags: MessageFlags.Ephemeral });
            } else {
                return interaction.reply({ content: "Failed to store rebirths. Please try again later.", flags: MessageFlags.Ephemeral });
            }
        } catch (error) {
            console.error("Database error:", error);
            return interaction.reply({ content: "An error occurred while storing your rebirths.", flags: MessageFlags.Ephemeral });
        }
    }}