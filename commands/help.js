const { prefix } = require("../config.json")

module.exports = {
    name: "help",
    description: "Get a list of commands, or help about a specific one.",
    execute(msg, args) {
        const data = []
        const { commands } = msg.client

        if (!args.length) {
            // List commands
            data.push("List of all commands:")
            data.push(`\`${commands.map(command => command.name).join(", ")}\``)
            data.push(`\nType \`${prefix}help <command name>\` to get info on a specific command.`)
            
        } else {
            // Help about specific command
            const commandName = args[0].toLowerCase()
            const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

            if (!command) {
                msg.channel.send(`Unknown command \`${commandName}\``)
                return
            }

            data.push(`**Name:** ${command.name}`)

            if (command.aliases) data.push(`**Aliases:** \`${command.aliases.join(", ")}\``)
            if (command.description) data.push(`**Description:** "${command.description}"`)
            if (command.args) data.push(`**Usage:** \`${prefix}${command.name} ${command.args}\``)
        }
        msg.channel.send(data)
    }
}
