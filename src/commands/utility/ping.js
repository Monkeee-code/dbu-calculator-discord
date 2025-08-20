const db = require('../../db');
const { MessageFlags } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s database connection.',
    callback: async (client, interaction) => {
        (async () => {
            try {
                const connection = await db.getConnection();
                await connection.ping(); // Checks if DB is responsive
                interaction.reply({ content: '[DB] ✅ Connected to MySQL successfully!', flags: MessageFlags.Ephemeral});
                connection.release();
            } catch (error) {
                console.error('[DB] ❌ Failed to connect to MySQL:', error.message);
                interaction.reply({ content: '[DB] ❌ Failed to connect to MySQL. Please check the logs for more details.', flags: MessageFlags.Ephemeral });
            }
})();
    }
}