const { ApplicationCommandOptionType, MessageFlags} = require('discord.js');

module.exports = {
    name: "eval",
    description: "Runs JS code as bot (DEV ONLY)",
    options: [
        { name: "code", description: "Code that you want to run", type: ApplicationCommandOptionType.String, required: true}
    ],
    devOnly: true,
    callback: (client, interaction) => {
        try {
            eval(interaction.options.get('code').value);
            interaction.reply({content: "The code was ran!", flags: MessageFlags.Ephemeral})
        } catch (error) {
            console.log(`There was an error while running the eval command: ${error}`)
            interaction.reply({
                content: `There was an error:\n\`${error}\``,
                flags: MessageFlags.Ephemeral
            })
        }
    }
};