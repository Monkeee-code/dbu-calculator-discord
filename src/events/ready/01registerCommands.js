const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();

        // GLOBAL COMMANDS
        const globalCommands = await client.application.commands.fetch();

        for (const localCommand of localCommands) {
            const { name, description, options, deleted, guildOnly } = localCommand;

            if (guildOnly) continue; // Skip guild-only commands for global

            const existingCommand = globalCommands.find(cmd => cmd.name === name);

            if (existingCommand) {
                if (deleted) {
                    await client.application.commands.delete(existingCommand.id);
                    console.log(`[GLOBAL] Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await client.application.commands.edit(existingCommand.id, { description, options });
                    console.log(`[GLOBAL] Edited command "${name}"`);
                }
            } else {
                if (deleted) {
                    console.log(`[GLOBAL] Skipped deleted command "${name}"`);
                    continue;
                }

                await client.application.commands.create({ name, description, options });
                console.log(`[GLOBAL] Registered command "${name}"`);
            }
        }

        // GUILD COMMANDS
        const guild = client.guilds.cache.get(testServer);
        if (!guild) {
            console.error("Guild not found");
            return;
        }

        const guildCommands = await guild.commands.fetch();

        for (const localCommand of localCommands) {
            const { name, description, options, deleted, guildOnly } = localCommand;

            if (!guildOnly) continue; // Skip global-only commands for guild

            const existingCommand = guildCommands.find(cmd => cmd.name === name);

            if (existingCommand) {
                if (deleted) {
                    await guild.commands.delete(existingCommand.id);
                    console.log(`[GUILD] Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await guild.commands.edit(existingCommand.id, { description, options });
                    console.log(`[GUILD] Edited command "${name}"`);
                }
            } else {
                if (deleted) {
                    console.log(`[GUILD] Skipped deleted command "${name}"`);
                    continue;
                }

                await guild.commands.create({ name, description, options });
                console.log(`[GUILD] Registered command "${name}"`);
            }
        }

    } catch (error) {
        console.error(`There has been an error: ${error}`);
    }
};
