const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`${client.user.tag} is online`);
    client.user.setActivity({ name: "/help | Check our Website", type: ActivityType.Listening, });

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    console.log(`[${hours}:${minutes}:${seconds}] Code is ruunning... First Run.`);
    setTimeout(() => {
        console.log(`[${hours}:${minutes}:${seconds}] Code is running...`);
    }, 3600000);
};