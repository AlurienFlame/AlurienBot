require('dotenv').config()
const server = require('./server.js')
const fs = require("fs")
const dc = require("discord.js")
client = new dc.Client()
client.commands = new dc.Collection()

const commandFiles = fs.readdirSync("./commands")

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("message", msg => {
    // Check for prefix
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return

    const args = msg.content.slice(process.env.PREFIX.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    
    // Try getting the command by name, otherwise get it by alias
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    
    // Check if command exists
    if (!command) {
        msg.channel.send(`Unknown command \`${commandName}\``)
        return
    }

    // Check for valid arguments if necessary
    if (command.args && !args.length) {
        msg.channel.send(`That command requires arguments.\nTry \`${process.env.PREFIX}${command.name} ${command.args}\``)
        return
    }

    console.log(`Heard a command: "${msg}"`)
    try {
        command.execute(msg, args)
    } catch (error) {
        console.error(error)
        msg.channel.send(`There was an error trying to execute that command!\n\`${error}\``)
    }
})

client.login(process.env.TOKEN)
