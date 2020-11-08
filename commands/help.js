const { Command } = require('discord-akairo');
const { sendMessage } = require('../respond');
class HELP extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                description: 'view information about a specific command.',
                usage: 'help <commmand>',
                example: 'help setid'
                },
            args: [{
                id: 'alias',
                type: 'command',
                otherwise: (message) => sendMessage('you need to specify a command to view help on.', message.channel, 'true', 'false', 'false', 'true', message)
              }],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        sendMessage('**Description**: ' + args.alias.description.description + '\n**Usage:** ``' + this.client.commandHandler.prefix + args.alias.description.usage + '``\n**Example:** ``' + this.client.commandHandler.prefix + args.alias.description.example + '``', message.channel, 'false', 'true', this.client.commandHandler.prefix + args.alias, 'false', message)
        }
}
module.exports = HELP;