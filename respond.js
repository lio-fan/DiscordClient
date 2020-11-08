
const data = require('./data.json')
let colors = data.colors
//let { data, src } = require('data.json'); //src is legacy
const Discord = require('discord.js');

function sendMessage(text, channel, includeTag, titleValue, title, error, message) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    const embed = new Discord.MessageEmbed()
    embed.setDescription(text)
    embed.setTimestamp()
    embed.setFooter(data.footertext, data.footerimage)
    if(error === 'true') {
        embed.setColor('ff0000')
    } else {
        embed.setColor(color)
    }
    if(titleValue === 'true') {
        embed.setTitle(title)
    } 
    if(includeTag === 'true') {
        embed.setDescription(`**${message.author.tag}**, ` + text)
    } else {
        embed.setDescription(text)
    }
    channel.send(embed)
}
module.exports = {
    sendMessage: sendMessage
}
