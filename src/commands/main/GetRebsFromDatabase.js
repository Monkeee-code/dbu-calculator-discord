const { MessageFlags, ApplicationCommandOptionType } = require('discord.js');
const db = require('../../db');

module.exports = {
    name: 'getstoredrebs',
    description: 'Retrieve stored Rebirths from the database',
    options: [
        { name: "ephemeral", description: "Makes the message visible only to you!", type: ApplicationCommandOptionType.Boolean, required: false }
    ],
    callback: async (client, interaction) => {
        const isEphemeral = interaction.options.getBoolean("ephemeral") || false;

        try {
            const [rows] = await db.query('SELECT rebirths FROM users WHERE user_id = ?', [interaction.user.id]);
            if (rows.length > 0) {
                const storedRebirths = rows[0].rebirths;
                return interaction.reply({ content: `You have stored ${storedRebirths} rebirths.`, flags: isEphemeral ? MessageFlags.Ephemeral : 0 });
            } else {
                return interaction.reply({ content: "You have no stored rebirths. Use /storerebs to store your rebirths to the bot.", flags: isEphemeral ? MessageFlags.Ephemeral : 0 });
            }
        } catch (error) {
            console.error("Database error:", error);
            return interaction.reply({ content: "An error occurred while retrieving your stored rebirths.", flags: MessageFlags.Ephemeral });
        }
    }}