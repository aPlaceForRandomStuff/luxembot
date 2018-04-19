const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");

client.on("ready", () => {
    console.log("I am ready!");
});




client.on("message", (message) => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix)) return;
    else{

        if (command == "ping") {
            message.channel.send("pong!");
        }

    };



});

client.on("guildMemberAdd", (member) => {
    member.guild.channels.get("434403124275445802").send(`Welcome, <@` + member.user.id + `>. An agent of the ` + member.guild.roles.find("name", "NKVD") + ` will be with you soon to ask you a few vetting questions.`)

});

client.login(config.token);