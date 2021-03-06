const { Command } = require('klasa');
const responses = require('../../../config/responses/work_responses.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, {
      description: 'Do some quick work for cash.',
      cooldown: 900,
      runIn: ['text'],
    });
  }

  async run(message) {
    const response = responses[Math.floor(Math.random() * responses.length)];

    const reward = Math.round(Math.random() * (400 - 18) + 18);
    await message.author.settings.update('balance', message.author.settings.get('balance') + reward);

    let transformedResponse = response.replace(/{currency}/gi, message.guild.settings.get('currency'));
    transformedResponse = transformedResponse.replace(/{reward}/gi, '**' + reward + '**');

    message.send(new MessageEmbed()
      .setColor('GREEN')
      .setDescription(transformedResponse)
      .setAuthor(message.author.username, message.author.avatarURL()));
  }

};