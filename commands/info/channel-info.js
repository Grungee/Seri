const { Command } = require("discord.js-commando"); // import commando libraries
const moment = require("moment"); // import moment libraries
const { MessageEmbed } = require("discord.js"); // import embed class
const types = {
  dm: "DM",
  group: "Group DM",
  text: "Text Channel",
  voice: "Voice Channel",
  category: "Category",
  unknown: "Unknown",
}; // types of channel

module.exports = class ChannelCommand extends Command {
  // Commands are classes exported with module.exports
  constructor(client) {
    super(client, {
      name: "channel", // name of the command
      aliases: ["channel-info"], // other word which will trigger the command
      group: "info", // group which command is part of make sure that group you use already register in your bot.js
      memberName: "channel", // is the name of the command within the group
      description: "Responds with detailed information on a channel.", // description of the command
      clientPermissions: ["EMBED_LINKS"], // one who uses the command should have the following permission
      args: [
        // The args field is simply an array of objects, each containing data for that argument.
        {
          key: "channel",
          prompt: "Which channel would you like to get information on?", // is the text that displays if the user doesn't
          type: "channel", //  type of the argument
          default: (msg) => msg.channel, // default channel if any one is not mentioned
        },
      ],
    });
  }

  run(msg, { channel }) {
    const embed = new MessageEmbed() // make a embed
      .setColor(0x00ae86) // color
      .addField(
        // a field
        "❯ Name",
        channel.type === "dm" ? `@${channel.recipient.username}` : channel.name,
        true
      )
      .addField("❯ ID", channel.id, true)
      .addField("❯ NSFW", channel.nsfw ? "Yes" : "No", true)
      .addField(
        "❯ Category",
        channel.parent ? channel.parent.name : "None",
        true
      )
      .addField("❯ Type", types[channel.type], true)
      .addField(
        "❯ Creation Date",
        moment.utc(channel.createdAt).format("MM/DD/YYYY h:mm A"),
        true
      )
      .addField("❯ Topic", channel.topic || "None");
    return msg.embed(embed); // send the embed
  }
};
