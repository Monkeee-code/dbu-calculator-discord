const { Client, IntentsBitField, EmbedBuilder, ActivityType, MessageFlags } = require('discord.js');
require('dotenv').config();

const client = new Client({intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages
]})

const bosses = {
    "X Fighter Trainer": 700,
    "klirin": 1000,
    "Kid Nohag": 1400,
    "Turtle Student": 2000,
    "Radish": 2600,
    "Mapa": 3100,
    "Citizen": 3500,
    "Top X Fighter": 4000,
    "Super Vegetable": 6500,
    "Kaio Student": 9500,
    "Chilly": 9000,
    "Perfect Atom": 16000,
    "SSJ2 Wukong": 22000,
    "Kai-fist Master": 28500,
    "SSJB Wukong": 35000,
    "Broccoli": 50000,
    "SSJG Kakata": 70000,
    "Vegetable (GoD in training)": 110000,
    "Wukong (Omen)": 170000,
    "Vills (50%)": 245000,
    "Vis(20%)": 290000,
    "Vegetable (LBSSJ4)": 330000,
    "Wukong (LBSSJ4)": 370000,
    "Vekuta (LBSSJ4)": 420000,
    "Wukong Rose": 500000,
    "Vekuta (SSJBUI)": 580000,
    "Oozaru": 900000,
    "Goku Black": 3500000,
    "Winter Beerus": 630000,
    "Winter Roshi": 255000,
    "Winter Gohan": 13500,
    "Winter Goku": 105000
};

client.on("ready", (e) => {
    console.log(`The bot has logged in as ${e.user.username}`);

    client.user.setActivity({ name: "/help | Check our Website", type: ActivityType.Listening, });
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName == "calculate") {
        const rebirths = interaction.options.get('rebirths').value
        const talents = interaction.options.get('talents').value
        const boost = interaction.options.get('boost').value
        const bossSelect = interaction.options.get('boss').value

        const bossBaseStats = bosses[bossSelect];
        if (!bossBaseStats) {
            return interaction.reply({ content: "Invalid Boss Selection. Please use /bosslist to see the bosses", ephemeral: true})
        }

        // Gets the base multiplier
        const baseMultiplier = 1 + (rebirths * 0.25);

        // Define the total multiplier
        let totalMultiplier = baseMultiplier;

        // Step 1: Talents
        if (talents == true) totalMultiplier += baseMultiplier;

        // Step 2: Global Boost
        if (boost == 2) totalMultiplier += baseMultiplier;
        if (boost == 3) totalMultiplier += (2 * baseMultiplier);
        if (boost == 4) totalMultiplier += (3 * baseMultiplier);

        // Gets the final stats
        const finalStats = totalMultiplier * bossBaseStats
        const punchstr = (totalMultiplier * 30).toLocaleString('en-US');
        const punchspd = (totalMultiplier * 15).toLocaleString('en-US');
        const abs = (totalMultiplier * 120).toLocaleString('en-US');
        const speed = (totalMultiplier * 22.5).toLocaleString('en-US');

        // Gets stats needed for Rebirth
        const m = 2000000
        const statToReb = Math.floor(m * rebirths - 8000000).toLocaleString('en-US');

        // Create an embed and respond with it
        const embedResponse = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Calculation`)
            .addFields(
                { name: `${bossSelect}:`, value: `<:aquastar:1346201647432470588> ${finalStats.toLocaleString('en-US')}`, inline: true },
                { name: `Stats to Rebirth:`, value: `<:purplecube:1346201612837847122> ${statToReb.toString()}`, inline: true },
                { name: `Punch Gain:`, value: `<:redgem:1346201700150808691> Strength: ${punchstr}\n<:bluegem:1346201659197489162> Speed: ${punchspd}`, inline: true },
                { name: `Ki Blast:`, value: `<:yellowgem:1346201685537722388> ${punchstr}`, inline: true },
                { name: `Defense:`, value: `<:greencube:1346201710518992999> ${abs}`, inline: true },
                { name: `Aura Boost:`, value: `<:bluegem:1346201659197489162> ${speed} Speed/s`, inline: true })
            .setThumbnail(interaction.user.avatarURL())
            .setColor('Random')

            await interaction.reply({embeds:[embedResponse]})
        
    }

    if(interaction.commandName == "bosslist") {
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

    if(interaction.commandName == "help"){
        const embedResponse = new EmbedBuilder()
            .setTitle("Help Command")
            .setDescription("## About us\n**This Discord bot was made by <@642428322168569906> and <@909484644917981214>. This bot is integration from our [Website](https://monkeee-code.github.io/dbu-calculator/) to discord. This tool is a calculator for a roblox game called [Dragon Blox Ultimate](https://www.roblox.com/games/3311165597/), but we are not affiliated with the developers in any way. If you want to support us in any way, you may do so by boosting <:nitro:1346201669142319237> our [Discord Server](https://discord.gg/dAtcaSmDSs) which is also where you can contact us!**\n## Commands\n**/help - Shows current embed**\n**/bosslist - Lists all of the DBU Bosses and their Base stat gain**\n**/calculate - Calculates your given info and tells you the information** \`(Main Command)\`")
            .setColor("DarkPurple")
            .setThumbnail(client.user.avatarURL())
        await interaction.reply({embeds:[embedResponse]})
    }
})

client.login(process.env.TOKEN);