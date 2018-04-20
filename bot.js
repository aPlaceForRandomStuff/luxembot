const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");

let conf = JSON.parse(fs.readFileSync("config.json", "utf8"));


client.on("ready", () => {
    console.log("I am ready!");
});


client.on("message", (message) => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix)) return;
    else {

        if (command == "add" && message.member.roles.find("name", config.roles.mods) && message.channel.id == config.channels.lobby) {
            let role = message.guild.roles.find("name", config.roles.members);
            let member = message.mentions.members.first();
            member.addRole(role).catch(console.error);
            message.guild.channels.get(config.channels.general).send(`Welcome to the commune, ${member}! Please take a look at our <#${config.channels.rules}> and feel free to request pronoun roles and nsfw access in <#${config.channels.roles}>.`);
        }

        if (command == "roles" && message.channel.id == config.channels.roles) {
            if (args[0]) {
                if (args[0] == "list") {
                    message.channel.send("```\n" + conf.userRoles.join("\n") + "```");
                }
                else if (args[0] == "add" && args[1]) {
                    message.member.addRole(message.guild.roles.find("name", args[1]));
                    message.channel.send("Added role " + args[1])
                }
                else if (args[0] == "add" && !args[1]) {
                    message.channel.send("Please specify a role. Options are:\n```\n" + conf.userRoles.join("\n") + "```")
                }
                else if (args[0] == "remove" && args[1]){
                    message.member.removeRole(message.member.roles.find("name", args[1]));
                    message.channel.send(args[1] + " removed from your roles.")
                }
                else if (args[0] == "remove" && !args[1]){
                    message.channel.send("Please specify a role to remove.")
                }
                else {
                    message.channel.send("Invalid role.")
                }
            }
            else {
                message.channel.send("__Role commands:__ \n \n **\`" + config.prefix + "roles list\`**  lists available roles \n **\`" + config.prefix + "roles add role\`**  adds role \n **\`" + config.prefix + "roles remove role\`**  removes role")
            }
        }

        if (command == "setroles" && message.channel.id == config.channels.mod) {
            if (args[0]) {
                if (args[0] == "list") {
                    message.channel.send("Server Roles:\n```\n" + message.guild.roles.map(role => role.name).join("\n") + "```\nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```");
                }

                if (args[0] == "add" && args[1]) {
                    let role = message.guild.roles.find("name", args[1]);
                    if (!role) {
                        message.channel.send("Role does not exist\nServer Roles:\n```\n" + message.guild.roles.map(role => role.name).join("\n") + "```")
                    }
                    else if (role.name == config.roles.mods) {
                        message.channel.send("You cannot allow members to self-assign " + config.roles.mods)
                    }
                    else if (conf.userRoles.includes(role.name)) {
                        message.channel.send("Role is already self-assigned")
                    }
                    else {
                        message.channel.send("Added " + role.name + ". Members can now self-assign " + role.name);
                        conf.userRoles.push(role.name);
                        message.channel.send("Self-assigned roles: \n```" + conf.userRoles.join("\n") + "```");
                        fs.writeFile("config.json", JSON.stringify(conf), (err) => {
                            if (err) console.error(err)
                        });
                    }
                }

                else if (args[0] == "remove") {

                    if (args[1] && message.guild.roles.find("name", args[1])) {
                        let role = message.guild.roles.find("name", args[1]);
                        var index = conf.userRoles.indexOf(role.name);
                        if (index !== -1) {
                            conf.userRoles.splice(index, 1);
                        }
                        message.channel.send(role.name + " can no longer be self-assigned.");
                        fs.writeFile("config.json", JSON.stringify(conf), (err) => {
                            if (err) console.error(err)
                        });
                    }
                    else if (!args[1]){
                        message.channel.send("Please specify a role to remove.\nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```")
                    }

                    else {
                        message.channel.send("Specified role is not user-assignable. \nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```")
                    }
                }
            }
            else {
                message.channel.send("Please specify an option:\n**`list`**  show role configuration\n**`add`**  add new self-assignable roles\n**`remove`**  remove self-assignable role")
            }
        }
    }
});

client.on("guildMemberAdd", (member) => {
    member.guild.channels.get(config.channels.lobby).send(`Welcome, <@` + member.user.id + `>. An agent of the ` + member.guild.roles.find("name", config.roles.mods) + ` will be with you soon to ask you a few vetting questions.`)

});

client.login(config.token);