const config = require("./config.json")
const commander = require("./commands/commander.js")
const dc = require("discord.js")
global.client = new dc.Client()

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("message", commander)

client.login(config.token)
