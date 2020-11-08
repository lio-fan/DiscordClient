const { Command } = require('discord-akairo');
const { respond, error, properCommandUsage, sendMessage } = require('../respond');
const { dbUpdate } = require('../db')
const mongo = require('../mongo.js');
const userSchema = require('../schemas/data-schema.js')
class SETID extends Command {
    constructor() {
        super('setid', {
            aliases: ['setid'],
            description: {
                description: 'set your in-game ID.',
                usage: 'setid <id>',
                example: 'setid 123123123'
                },
            args: [
                {
                    id: 'integer',
                    type: 'integer',
                    otherwise: (message) => sendMessage(`you didn't specify an ID.`, message.channel, 'true', 'no', 'no', 'true', message)
                }
            ],
            channel: 'guild'
        });
    }
    async exec(message, args) {
        const test = JSON.stringify(args.integer)
        if(test.length !== 9) {
            return sendMessage(`you didn't specify an ID.`, message.channel, 'true', 'no', 'no', 'true', message)
        }
            dbUpdate(message.author.id, 'userID', args.integer, userSchema, message)
            return sendMessage(`you've successfully set your ID as: **` + args.integer + ' **.', message.channel, 'true', 'false', 'false', 'false', message)
    }
}
module.exports = SETID;