const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only developers are able to run this command",
                    ephemeral: true
                });
                return;
            }
        }
        if (commandObject.testOnly) {
            if (!interaction.guild.id === testServer) {
                interaction.reply({
                    content: "This command cannot be ran here.",
                    ephemeral: true
                });
                return;
            }
        }
        if (commandObject.permissionRequired?.length) {
            for (const permission of commandObject.permissionRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough permissions.",
                        ephemeral: true
                    });
                    return;
                }
            }
        }
        if (commandObject.botPermission?.length) {
            for (const permission of commandObject.botPermission) {
                const bot = interaction.guild.members.me;
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enought permissions.",
                        ephemeral: true
                    });
                    return;
                }
            }
        }
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
};