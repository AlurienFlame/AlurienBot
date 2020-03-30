module.exports = {
    name: "echo",
    description: "Have the bot repeat your message back to you.",
    aliases: ["mirror"],
    args: "<message to echo>",
	execute(msg, args) {
        output = args.join(" ")
		msg.channel.send(output);
	},
}