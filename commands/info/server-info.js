const { Command } = require("discord.js-commando"); // Importing Commando
const moment = require("moment"); // Importing moment
const { MessageEmbed } = require("discord.js"); // Importing embed class from discord.js
const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone",
}; // some filters
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Highest",
}; // verification system based on discord servers

module.exports = class ServerCommand extends Command {
  // Commands are classes exported with module.exports
  constructor(client) {
    super(client, {
      name: "server", // name of the command
      aliases: ["guild", "server-info", "guild-info"], // other word which will trigger the command
      group: "info", // group which command is part of make sure that group you use already register in register
      memberName: "server", // is the name of the command within the group
      description: "Responds with detailed information on the server.", // description of the command
      guildOnly: true, // can only be access in a server
      clientPermissions: ["EMBED_LINKS"], // one who uses the command should have the following permission
    });
  }

  async run(msg) {
    if (!msg.guild.members.cache.has(msg.guild.ownerID))
      await msg.guild.members.fetch(msg.guild.ownerID);
    const embed = new MessageEmbed() // embed making
      .setColor(0x00ae86) // color of the embed
      .setThumbnail(msg.guild.iconURL({ format: "png" })) // thumbnail image
      .addField("❯ Name", msg.guild.name, true) // a field
      .addField("❯ ID", msg.guild.id, true)
      .addField(
        "❯ Creation Date",
        moment.utc(msg.guild.createdAt).format("MM/DD/YYYY h:mm A"),
        true
      )
      .addField("❯ Owner", msg.guild.owner.user.tag, true)
      .addField("❯ Boost Count", msg.guild.premiumSubscriptionCount || 0, true)
      .addField(
        "❯ Boost Tier",
        msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : "None",
        true
      )
      .addField("❯ Region", msg.guild.region.toUpperCase(), true)
      .addField(
        "❯ Explicit Filter",
        filterLevels[msg.guild.explicitContentFilter],
        true
      )
      .addField(
        "❯ Verification Level",
        verificationLevels[msg.guild.verificationLevel],
        true
      )
      .addField("❯ Members", msg.guild.memberCount, true)
      .addField("❯ Roles", msg.guild.roles.cache.size, true)
      .addField(
        "❯ Channels",
        msg.guild.channels.cache.filter(
          (channel) => channel.type !== "category"
        ).size,
        true
      );
    return msg.embed(embed); // sends the message
  }
};
