# luxembot
This is a bot that makes live easier for the NKVD of the Furfag Commune Discord server.

## Current Features:
* **New User Alerts:** The bot pings @NKVD when a new user joins and makes them aware of the vetting process.
* **Quick Add:** Typing `!add @user` assigns the member role, changes their nickname, and points out the Roles and Rules channels.
* **User Role Management:** Server members can self-manage roles specified by the mods.

## Commands

### User commands

#### !roles

Allows users to manage their own roles from a list designated by the mods. Role input is case-sensitive.

 `!roles list` lists available roles
 
 `!roles add role` adds role
 
 `!roles remove role` removes role

### Mod commands

#### !add

Adds the mentioned user to the member role, changes their nickname to fit the server style, and sends them a welcome message pointing out the rules and role request channel.

`!add @user` adds the mentioned user as stated above

#### !setroles
Allows modds to manage the roles in the self-assignment system available to users. The mod role and admin roles cannot be added to the list of options. Role input is case-sensitive.

`!setroles list` lists the server's roles as well as the currently specified roles that members are allowed to self-assign

`!setroles add role` adds the role to the list of self-assignable roles 

`setroles remove role` removes a role from the list of self-assignable roles

## Contributing

### Requirements
You'll need Node Package Manager installed on your machine to work on this bot.

https://www.npmjs.com/get-npm

### Set Up
After cloning the repository, run `npm install` inside the repo directory to install dependencies. 

#### Configuration

Duplicate `config.template.json` as `config.json` and fill it in as follows:  

```json
  "token": "",
  "prefix": "",
```
The token here is your bot token, and prefix is the character(s) you'd like to type to trigger the bot. FFC uses "!".

```json
  "channels": {
    "general": "",
    "roles": "",
    "rules": "",
    "lobby": "",
    "mod": ""
  },
```
In this section, you'll need to get the ids for each channel specified.
* `general` is the name of the channel where you'd like a user to receive their welcome message after receiving the member role.
* `roles` is the channel where you'd like users to be able to request roles.
* `rules` is the channel that lists your server's rules.
* `lobby` is the landing area where users who join your servers are vetted.
* `mod` is the name of the channel where the bot can be configured. Currently, configuration commands are available to anyone who has access to this channel.

```json
  "roles": {
    "mods": "",
    "members": ""
  },
```
These are the names of the mod role and the member role. Currently all role-related functionality of this bot is case sensitive.

For more information on initializing a Discord Bot, including how to get your token and add it into a server, see: 
 
[https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version.html)
 
### Launch
After you've got your bot configuration set up, bring it to life with `node bot.js`


    Sowidawity Fowevew