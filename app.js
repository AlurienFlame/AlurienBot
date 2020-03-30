const dc = require("discord.js")
const client = new dc.Client()

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("message", msg => {
    if (msg.mentions.has(client.user)) {
        msg.channel.send("Did someone say my name?")
    }
    if (msg.content === "ping") {
        msg.channel.send("Pong!")
    }
})

client.login("Njk0MDQwNzU4NDE1NTIzODQy.XoF2Qg.OOvoYsbooUn4xHD_kvshlPp3gGg")