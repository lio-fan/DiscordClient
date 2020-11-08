const { Command } = require('discord-akairo');
const { dbFind, dbUpdate } = require('../db');
const { sendMessage } = require('../respond');
const userSchema = require('../schemas/data-schema')
const guildSchema = require('../schemas/guild-schema.js');
class MUTE extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            userPermissions: ['MANAGE_ROLES'],
            clientPermissions: ['MANAGE_ROLES'],
            description: {
                description: 'mute a member.',
                usage: 'mute <member>',
                example: 'mute Riqui'
                },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    otherwise: (message) => sendMessage(`you didn't specify a member to mute.`, message.channel, 'true', 'false', 'false', 'true', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        dbUpdate(args.member.id, 'muted', 'true', userSchema)
        dbFind(message.guild.id, 'some text', 'mutedRole', guildSchema, 'true', args.member, message)
        }
}
module.exports = MUTE;