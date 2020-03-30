module.exports = {
    name: "ping",
    aliases: ["poing", "piong"],
	execute(msg) {
		msg.channel.send("Pong!");
	},
}