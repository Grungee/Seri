const { CommandoClient } = require("discord.js-commando"); // Importing Commando
const path = require("path"); // Importing Path
const config = require("./config.json"); // For Importing Bot's Token

const client = new CommandoClient({
  commandPrefix: "?", // Bot's Prefix
  owner: "745235956700807189", // Your Discord ID
  invite: "https://discord.gg/realop", // Your Discord Server Link
});

client.registry
  .registerDefaultTypes() // Runs default Arg types from commando
  .registerGroups([["info", "Info & Utility"]]) // Add your command group types you wish to have

  .registerDefaultGroups() // Runs default groups from commando
  .registerDefaultCommands() // Runs default commands from commando
  .registerCommandsIn(path.join(__dirname, "commands")); // Place Where you're are storing all the commands in my case folder name is commands

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity("with Commando"); // Bot's Status
}); // if the bot is online then console should log the bot is online

client.on("error", console.error); // If there is any error console will show a error

client.login(config.token); // Bot Token For Login
