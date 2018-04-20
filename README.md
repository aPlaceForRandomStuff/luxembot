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

You will need to create a config.json file to store the bot token for this bot. For more information on initializing a Discord Bot, see: 
 
[https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version.html)
 
After you've got your bot permissions set up, bring it to life with `node bot.js`

Your config.json file will also hold channel ids for certain channels as well as the names of your member and mod roles.

    Sowidawity Fowevew