require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, Options } = require('discord.js');

const commands = [
    {
        name: "calculate",
        description: "Calculate the info",
        options: [
            {
                name: "rebirths",
                description: "an amount of rebirths you have",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "talents",
                description: "If you have permanent 2x from shop",
                type: ApplicationCommandOptionType.Boolean,
                required: true,
            },
            {
                name: "boost",
                description: "If a global booster is enabled",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    { name: 'None', value: 0 },
                    { name: '2x', value: 2 },
                    { name: '3x', value: 3 },
                    { name: "4x", value: 4 }
                ]
            },
            {
                name: "boss",
                description: "Select the boss you want to calculate",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
    {
        name: "bosslist",
        description: "Display the list of the bosses",
        options: [
            { name: "ephemeral", description: "If you want he message to only be vissible to you. Default: false", type: ApplicationCommandOptionType.Boolean, required: false}
        ]
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

// (async () => {
//     try {
//         console.log('Registering slash commands...');

//         await rest.put(
//             Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID),
//             { body: commands }
//         )

//         console.log('Slash Commands were registred succesfully!');
//     } catch (error) {
//         console.log(`There was an error: ${error}`)
//     }
// });


async function register() {
    try {
        console.log('Registering slash commands...');
        
        await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENTID, process.env.SERVERID),
        { body: commands }
        )
        
        console.log('Slash Commands were registred succesfully!');
        } catch (error) {
            console.log(`There was an error: ${error}`)
        }
}

register();


