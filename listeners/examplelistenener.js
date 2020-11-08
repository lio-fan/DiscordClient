
const { Listener } = require('discord-akairo');
const { dbFind } = require('../db')
const userSchema = require('../schemas/data-schema')
class MessageListener extends Listener {
    constructor() {
        super('message', {
            emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client'
        });
    }

    exec(msg) {
        const guildMEMBER = msg.guild.member(msg.user.id)
        return dbFind(guildMEMBER.id, 'some text', 'muted', userSchema, 'sustainmute', guildMEMBER, msg)
    }
}

module.exports = MessageListener;