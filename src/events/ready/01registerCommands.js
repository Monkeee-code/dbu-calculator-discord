const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands) {
            const {name, description, options} = localCommand;
            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name);

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.error(`Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`Edited Command "${name}"`)
                }
            } else {
                if (localCommand.deleted) {
                    console.warn(`Skipping registration of "${name}", Reason: Set to deleted`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered Command "${name}"`);
            }
        }
    } catch (error) {
        console.error(`There has been an error: ${error}`)
    }
};