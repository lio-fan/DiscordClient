const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const Discord = require('discord.js')
const { config } = require('dotenv')
const { join } = require('path');
config();
class PES extends AkairoClient {
 constructor() {
  super({
   ownerID: '750519788232507534',
  }, {
   disableEveryone: true
  });
  this.commandHandler = new CommandHandler(this, {
   directory: './',
   prefix: '$',
   blockBots: true,
   blockClient: true,
   allowMention: true,
   defaultCooldown: 2000,
  });
  this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/'
  });

  this.inhibitorHandler = new InhibitorHandler(this, {
    directory: './inhibitors/'
});
  this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
  this.commandHandler.useListenerHandler(this.listenerHandler);
  this.listenerHandler.setEmitters({
    commandHandler: this.commandHandler,
    inhibitorHandler: this.inhibitorHandler,
    listenerHandler: this.listenerHandler
});
  this.inhibitorHandler.loadAll();
  this.listenerHandler.loadAll();
  this.commandHandler.loadAll();
 }
}
const client = new PES();

const mongo = require('./mongo')
client.login(process.env.token);