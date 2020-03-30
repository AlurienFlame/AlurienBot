const ping = require("./ping")

const commands = {
    ping
}

module.exports = msg => {
    if (msg.mentions.has(client.user)) {
        msg.channel.send("Did someone say my name?")
    }
    if (Object.keys(commands).includes(msg)) {
        commands[msg](msg)
    }
}