const { Client, IntentsBitField, } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
require('dotenv').config();

// Defining client and it's Gateway Bit Fields

const client = new Client({intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages
]})

eventHandler(client);

client.login(process.env.TOKEN);