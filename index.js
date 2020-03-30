const config = require("./config.json")
const fs = require("fs")
const dc = require("discord.js")
client = new dc.Client()
client.commands = new dc.Collection()

const commandFiles = fs.readdirSync("./commands")
console.log(`Command files are ${commandFiles}.`)

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("message", msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return

    const args = msg.content.slice(config.prefix.length).split(/ +/)
    const commandName = args.shift().toLowerCase()
    
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    
    if (!command) {
        msg.channel.send(`Unknown command \`${commandName}\``)
        return
    }

    if (command.args && !args.length) {
        msg.channel.send(`That command requires arguments.\nTry \`${config.prefix}${command.name} ${command.args}\``)
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

client.login(config.token)
