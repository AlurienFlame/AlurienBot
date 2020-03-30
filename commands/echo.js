module.exports = {
    name: "echo",
    args: "<message to echo>",
	execute(msg, args) {
        output = args.join(" ")
		msg.channel.send(output);
	},
}