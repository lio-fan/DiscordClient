const { Command } = require('discord-akairo');
  const Discord = require('discord.js')
  const { sendMessage } = require('../respond');
  const mongo = require('../mongo.js');
  const eventSchema = require('../schemas/event-schema.js');
  const data = require('../data.json')
  let colors = data.colors
  class EVENTS extends Command {
    constructor() {
      super('events', {
        aliases: ['events'],
        description: {
          description: 'view all current in-game events.',
          usage: 'events',
          example: 'events'
          },
        args: [],
      });
    }
    async exec(message, args) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      await mongo().then(async (mongoose) => {
        try {
          const count = '6'
          var i;
          const embedd = new Discord.MessageEmbed()
          embedd.setDescription('**Current Events:**')
          embedd.setFooter(data.footertext, data.footerimage)
          embedd.setColor(color)
          for (i = 0; i < count; i++) {
            const t = i + 1
            const result = await eventSchema.findOne({
              _id: t
            })
            const information = result.information
            const title = information[0]
            embedd.addField('**Event ' + t + '**:', '*' + title + '*')
          }
          message.channel.send(embedd)
        } finally {
          mongoose.connection.close()
        }
      })
    }
  }
  module.exports = EVENTS;