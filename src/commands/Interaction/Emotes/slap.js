const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Slap someone.',
      cooldown: 3,
      usage: '<member:member|name:str>',
      usageDelim: ' ',
    });
  }

  async run(msg, params) {
    let member = params[0];
    console.log(member);
    let newMember;
    if (typeof member === 'string') newMember = msg.guild.members.cache.find(m => m.displayName.toLowerCase().includes(member.toLowerCase()));
    if (!newMember && typeof member === 'string') newMember = msg.guild.members.cache.find(m => m.user.username.toLowerCase().includes(member.toLowerCase()));
    if (!newMember && typeof member === 'string') newMember = params[0];
    if (newMember) member = newMember;

    if (member.displayName.includes('@everyone' || '@here') || msg.member.displayName.includes('@everyone' || '@here')) return msg.send('I\'m smarter');
    const image = await fetch('https://nekos.life/api/v2/img/slap')
      .then(response => response.json())
      .then(body => body.url);
    return msg.sendMessage(
      new MessageEmbed()
        .setColor('#0099FF')
        .setImage(image)
        .setDescription('**' + msg.member.displayName + '** slaps **' + member.displayName + '**')
        .setFooter('😣👏'),
    );
  }

};