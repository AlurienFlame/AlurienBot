module.exports = {
    name: "emoji",
    description: "The bot uses emojis!",
    aliases: ["sunflake"],
	execute(msg) {
        // React with emoji
        msg.react('694104801247625227');
        // Send emoji
		msg.channel.send("<:sunflake:694104801247625227>");
	},
}