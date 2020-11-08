const { Command } = require('discord-akairo');
const { dbFind, dbUpdate } = require('../db');
const { sendMessage } = require('../respond');
const userSchema = require('../schemas/data-schema')
const guildSchema = require('../schemas/guild-schema.js');
class UNMUTE extends Command {
    constructor() {
        super('unmute', {
            aliases: ['unmute'],
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            description: {
                description: 'unmute a member.',
                usage: 'unmute <member>',
                example: 'unmute Riqui'
                },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    otherwise: (message) => sendMessage(`you didn't specify a member to unmute.`, message.channel, 'true', 'false', 'false', 'true', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        dbUpdate(args.member.id, 'muted', 'false', userSchema)
        dbFind(message.guild.id, 'some text', 'mutedRole', guildSchema, 'trueUnmute', args.member, message)
        }
}
module.exports = UNMUTE;