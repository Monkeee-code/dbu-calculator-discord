const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`${client.user.tag} is online`);
    client.user.setActivity({ name: "/help | Check our Website", type: ActivityType.Listening, });
    let hours1 = 1;
    let now1 = new Date();
    console.log(`[${now1.getHours()}:${now1.getMinutes()}:${now1.getSeconds()}] Code is ruunning... First Run. (0)`);
    setInterval(() => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        console.log(`[${hours}:${minutes}:${seconds}] Code is running... (${hours1})`);
        hours1++;
    }, 3600000);
};