# luxembot
This is a bot that makes live easier for the NKVD of the Furfag Commune Discord server.

## Current Features:
* **New User Alerts:** The bot pings @NKVD when a new user joins and makes them aware of the vetting process.
* **Quick Add:** Typing `!add @user` assigns the member role and points out the Roles and Rules channels.
* **User Role Setting:** Server members can set roles specified by the mods.

## Requirements
You'll need Node Package Manager installed on your machine to work on this bot.

https://www.npmjs.com/get-npm

## Set Up:
After cloning the repository, run `npm install` inside the repo directory to install dependencies. 

###Configuration

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
These are the names of the mod role and the member role. Currently all role related functionality of this bot is case sensitive.

For more information on initializing a Discord Bot, including how to get your token and add it into a server, see: 
 
[https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version.html)
 
### Launch
After you've got your bot configuration set up, bring it to life with `node bot.js`


    Sowidawity Fowevew