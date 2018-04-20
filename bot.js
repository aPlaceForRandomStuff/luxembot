const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");
const fs = require("fs");

let conf = JSON.parse(fs.readFileSync("config.json", "utf8"));


client.on("ready", () => {
    console.log("I am ready!");
});


client.on("message", (message) => {
    //Get command arguments and load them into an array called args[]
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(config.prefix)) return; //This ignores chat input that does not begin with the bot prefix
    else {

        if (command == "add" && message.member.roles.find("name", config.roles.mods) && message.channel.id == config.channels.lobby) { //Making sure that only mods can run the !add command
            //Add the mentioned user to the member role, change their nickname, and ping them with a welcome message
            let role = message.guild.roles.find("name", config.roles.members);
            let member = message.mentions.members.first();
            member.addRole(role).catch(console.error);
            let nick = member.displayName;
            member.setNickname("Comrade " + nick);
            message.guild.channels.get(config.channels.general).send(`Welcome to the commune, ${member}! Please take a look at our <#${config.channels.rules}> and feel free to request pronoun roles and nsfw access in <#${config.channels.roles}>.`);
        }

        if (command == "roles" && message.channel.id == config.channels.roles) { //These commands only work in the roles channel
            if (args[0]) {
                if (args[0] == "list") { //Listing out user roles
                    message.channel.send("```\n" + conf.userRoles.join("\n") + "```");
                }
                else if (args[0] == "add" && args[1]) { //Add the role provided as an arugment to the sender
                    message.member.addRole(message.guild.roles.find("name", args[1]));
                    message.channel.send("Added role " + args[1])
                }
                else if (args[0] == "add" && !args[1]) { //Catching when a user does not provide a role to be added to
                    message.channel.send("Please specify a role. Options are:\n```\n" + conf.userRoles.join("\n") + "```")
                }
                else if (args[0] == "remove" && args[1]){ //Removes the role provided as an argument to the sender
                    message.member.removeRole(message.member.roles.find("name", args[1]));
                    message.channel.send(args[1] + " removed from your roles.")
                }
                else if (args[0] == "remove" && !args[1]){ //Catching when a user does not provide a role to be removed from
                    message.channel.send("Please specify a role to remove.")
                }
                else { //Lets a user know when their role command didn't work because they chose something that wasn't an option
                    message.channel.send("Invalid role.")
                }
            }
            else { //If a user just types !roles, they'll see their options
                message.channel.send("__Role commands:__ \n \n **\`" + config.prefix + "roles list\`**  lists available roles \n **\`" + config.prefix + "roles add role\`**  adds role \n **\`" + config.prefix + "roles remove role\`**  removes role")
            }
        }

        if (command == "setroles" && message.channel.id == config.channels.mod) { //These commands allow the mods to control the role options that members have
            if (args[0]) {
                if (args[0] == "list") { //Listing out all of the server's roles, as well as any that have been designated for member assignment. Note that the assignable roles are stored in config.json
                    message.channel.send("Server Roles:\n```\n" + message.guild.roles.map(role => role.name).join("\n") + "```\nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```");
                }

                if (args[0] == "add" && args[1]) {
                    let role = message.guild.roles.find("name", args[1]);
                    if (!role) { //Checking to make sure any roles passed actually exist.
                        message.channel.send("Role does not exist\nServer Roles:\n```\n" + message.guild.roles.map(role => role.name).join("\n") + "```")
                    }
                    else if (role.name == config.roles.mods) { //Stops anyone from adding the mod role to the list of assignable roles
                        message.channel.send("You cannot allow members to self-assign " + config.roles.mods)
                    }
                    else if (conf.userRoles.includes(role.name)) { //Prevents duplicate roles from being added to the assignable list
                        message.channel.send("Role is already self-assigned")
                    }
                    else { //Adds the specified role to the list of roles available for members to self-assign
                        message.channel.send("Added " + role.name + ". Members can now self-assign " + role.name);
                        conf.userRoles.push(role.name);
                        message.channel.send("Self-assigned roles: \n```" + conf.userRoles.join("\n") + "```"); //These three lines write the new list of self-assigned roles to config.json
                        fs.writeFile("config.json", JSON.stringify(conf), (err) => {
                            if (err) console.error(err)
                        });
                    }
                }

                else if (args[0] == "remove") { //Functionality to remove roles from the assignable list

                    if (args[1] && message.guild.roles.find("name", args[1])) { //Make sure we have a real role to remove
                        let role = message.guild.roles.find("name", args[1]); //This seems redundant, but we have to check if this exists before assigning it. Maybe there's a better way?
                        let index = conf.userRoles.indexOf(role.name); //Strip out the offending role
                        if (index !== -1) {
                            conf.userRoles.splice(index, 1);
                        }
                        message.channel.send(role.name + " can no longer be self-assigned.");
                        fs.writeFile("config.json", JSON.stringify(conf), (err) => { //These three lines write the new list of self-assigned roles to config.json
                            if (err) console.error(err)
                        });
                    }
                    else if (!args[1]){ //Just in case a user forgets to pass a role to be removed
                        message.channel.send("Please specify a role to remove.\nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```")
                    }

                    else { //Let the user know if they've entered an invalid command
                        message.channel.send("Specified role is not user-assignable. \nUser-Assignable Roles:\n```\n" + conf.userRoles.join("\n") + "```")
                    }
                }
            }
            else { //If there is no argument after !setroles, just list the command's options
                message.channel.send("Please specify an option:\n**`list`**  show role configuration\n**`add`**  add new self-assignable roles\n**`remove`**  remove self-assignable role")
            }
        }
    }
});

client.on("guildMemberAdd", (member) => { //Ping NKVD when a new user joins. This uses backticks because i Had template literals at first and now I'm too lazy to fix it.
    member.guild.channels.get(config.channels.lobby).send(`Welcome, <@` + member.user.id + `>. An agent of the ` + member.guild.roles.find("name", config.roles.mods) + ` will be with you soon to ask you a few vetting questions.`)

});

client.login(config.token);