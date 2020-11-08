const { Command } = require('discord-akairo');
const { sendMessage } = require('../respond');
const { dbUpdate } = require('../db')
const mongo = require('../mongo.js');
const guildSchema = require('../schemas/guild-schema.js')
class SETMUTEDROLE extends Command {
    constructor() {
        super('setmutedrole', {
            aliases: ['setmutedrole', 'setmuted', 'setmuterole'],
            userPermissions: ['MANAGE_GUILD'],
            description: {
                description: 'set the muted role for the current guild.',
                usage: 'setmutedrole <role>',
                example: 'setmutedrole Muted'
                },
            args: [
                {
                    id: 'role',
                    type: 'role',
                    otherwise: (message) => sendMessage(`you didn't specify a role.`, message.channel, 'true', 'no', 'no', 'true', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        dbUpdate(message.guild.id, 'mutedRole', args.role, guildSchema, message)
        return sendMessage(`you've successfully set **${message.guild.name}**'s Muted role as: **` + args.role.name + ' **.', message.channel, 'true', 'false', 'false', 'false', message)
    }
}
module.exports = SETMUTEDROLE;