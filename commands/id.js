const { Command } = require('discord-akairo');
const { dbFind, dbUpdate } = require('../db')
const userSchema = require('../schemas/data-schema')
class ID extends Command {
    constructor() {
        super('id', {
            aliases: ['id'],
            description: {
                description: 'view the in-game ID of you or another user.',
                usage: 'id <OPTIONAL: user>',
                example: 'id OPTIONAL:Riqui'
                },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    otherwise: (message) => dbFind(message.author.id, 'your ID is:', 'userID', userSchema, 'false', 'false', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        return dbFind(args.member.id, `**${args.member.user.tag}**'s ID is:`, 'userID', userSchema, 'false', 'false', message)
        }
}
module.exports = ID;