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

        if (command == "add"  && message.member.roles.find("name", config.roles.mods)) {
            let role = message.guild.roles.find("name", config.roles.members);
            let member = message.mentions.members.first();
            member.addRole(role).catch(console.error);
            message.guild.channels.get(config.channels.general).send(`Welcome to the commune, ${member}! Please take a look at our <#${config.channels.rules}> and feel free to request pronoun roles and nsfw access in <#${config.channels.roles}>.`);
        }

        if (command == "roles" && message.channel.id == config.channels.roles) {
            if (args[0]) {
                if (args[0] == "list") {
                    message.channel.send(message.guild.roles.array().join());
                }
                else if (message.guild.roles.find("name", args[0])) {
                    // let member = message.author.id;
                    message.member.addRole(message.guild.roles.find("name", args[0]))
                    message.channel.send("Role does exist.")
                }
                else {
                    message.channel.send("Role does not exist.")
                }
            }
            else {
                message.channel.send("__Role commands:__ \n \n **\`!roles list\`**  lists available roles \n **\`!roles role\`**  adds role \n **\`!roles remove role\`**  removes role")
            }
        }
    }

});

client.on("guildMemberAdd", (member) => {
    member.guild.channels.get(config.channels.lobby).send(`Welcome, <@` + member.user.id + `>. An agent of the ` + member.guild.roles.find("name", config.roles.mods) + ` will be with you soon to ask you a few vetting questions.`)

});

client.login(config.token);