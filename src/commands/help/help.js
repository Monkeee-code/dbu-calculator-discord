const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Displays the info about the bot.',

    callback: async (client, interaction) => {
        const embedResponse = new EmbedBuilder()
            .setTitle("Help Command")
            .setDescription("## About us\n**This Discord bot was made by <@642428322168569906> and <@909484644917981214> (FORMER). This bot is integration from our [Website](https://monkeee-code.github.io/dbu-calculator/) to discord. This tool is a calculator for a roblox game called [Dragon Blox Ultimate](https://www.roblox.com/games/3311165597/), but we are not affiliated with the developers in any way, shape or form. If you want to support us in any way, you may do so by boosting <:nitro:1346201669142319237> our [Discord Server](https://discord.gg/dAtcaSmDSs) which is also where you can contact us for support! Contact is also avalible via email on [admin@dbuc.xyz](mailto:admin@dbuc.xyz).**\n## Links\n**[Github](https://github.com/Monkeee-code/dbu-calculator-discord)**\n**[Bot Invite](https://discord.com/oauth2/authorize?client_id=1345798226011492454&permissions=18432&integration_type=0&scope=bot+applications.commands)**\n**[Terms of Service](https://monkeee-code.github.io/dbu-calculator/tos.txt)**\n**[Privacy Policy](https://monkeee-code.github.io/dbu-calculator/pp.txt)**\n## Commands\n**</help:1399725953768226818> - Shows current embed**\n**</bosslist:1399725952254087179> - Lists all of the DBU Bosses and their Base stat gain**\n**</calculate:1399725960911257782> - Calculates your given info and tells you the information** \`(Main Command)\`\n**</storerebs:1399725958923288656> - Stores your rebirths in the database for later use**\n**</getstoredrebs:1399725956490334301> - Gets your stored rebirths from the database**")
            .setColor("DarkPurple")
            .setThumbnail(client.user.avatarURL())
        await interaction.reply({embeds:[embedResponse]})
    }
}