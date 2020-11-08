const Discord = require('discord.js');
const data = require('./data.json')
let colors = data.colors
const { sendMessage } = require('./respond')
const mongo = require('./mongo');
const userSchema = require('./schemas/data-schema.js');
const guildSchema = require('./schemas/guild-schema');
async function dbFind(id, text, resultsearchfor, schema, addRole, roleMember, message ) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    await mongo().then(async (mongoose) => {
        try {
            const embed = new Discord.MessageEmbed()
            embed.setTimestamp()
            embed.setFooter(data.footertext, data.footerimage)
            const result = await schema.findOne({ _id: id });
            if(result === null) {
                embed.setColor('ff0000')
                embed.setDescription(`${message.author.tag}, I couldn't find that database entry.`)
                message.channel.send(embed)
                return;
            }
            const variable = await result[resultsearchfor]
            if(addRole === 'true') {
                if(roleMember.roles.cache.has(variable)) {
                    return sendMessage('this user already has this role.', message.channel, 'true', 'no', 'no', 'true', message)
                }
                sendMessage(`you have successfully muted **${roleMember.user.tag}**.`, message.channel, 'true', 'no', 'no', 'no', message)
                return roleMember.roles.add(variable)
            }
            if(addRole === 'trueUnmute') {
                if(!roleMember.roles.cache.has(variable)) {
                    sendMessage(`this user doesn't have this role.`, message.channel, 'true', 'no', 'no', 'true', message)
                }
                sendMessage(`you've successfully unmuted **${roleMember.user.tag}**.`, message.channel, 'true', 'no', 'no', 'no', message)
                return roleMember.roles.remove(variable)
            }
            if(addRole === 'sustainmute') {
                const muteROLE = await guildSchema.findOne({ _id: message.guild.id });
                if(muteROLE === null) {
                    return;
                }
                const mutedROLE = await muteROLE.mutedRole
                if(variable === 'true') {
                    return roleMember.roles.add(mutedROLE);
                }
                return;
            }
            embed.setDescription(`**${message.author.tag}**, ` + text + ' ' + variable)
            embed.setColor(color)
            message.channel.send(embed)
        } finally {
            mongoose.connection.close()
        }
    })
    return;
}
async function dbUpdate(id, type, param, schema, message) {
    await mongo().then(async (mongoose) => {
        try {
            await schema.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                [type]: param
                }, {
                upsert: true
            })
            await console.log(`[MONGODB]: Parsed "` + param + `" into ` + id + `'s ` + param + '.')
        } finally {
            mongoose.connection.close
        }
    })
}
module.exports = {
    dbFind: dbFind,
    dbUpdate: dbUpdate
}
