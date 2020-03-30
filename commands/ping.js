module.exports = {
    name: "ping",
    description: "Check that the bot is working.",
	execute(msg) {
		msg.channel.send("Pong!");
	},
}