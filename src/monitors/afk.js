const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Monitor {
  constructor(...args) {
    super(...args, {
      ignoreOthers: false,
      ignoreEdits: false,
    });
  }

  async run(message) {
    const settings = message.client.settings.get('afk');
    // remove afk
    if (settings.includes(message.author.id)) {
      message.client.settings.update('afk', message.author.id, { arrayAction: 'remove' });
      const sent = await message.send(`Welcome back ${message.member}, I have removed your AFK`);
      setTimeout(function() {
        sent.delete();
      }, 3000);
    }

    // detect afk
    if (message.mentions.members.size === 0) return;
    for (let i = 0; i < message.mentions.members.size; i++) {
      const member = message.mentions.members.array()[i];
      if (settings.includes(member.user.id)) {
        const embed = new MessageEmbed()
          .setAuthor(`${member.displayName} is AFK`, member.user.avatarURL())
          .setColor('#0099FF');
        if (member.user.settings.get('afkStatus') !== 'none') embed.setDescription(member.user.settings.get('afkStatus'));
        return message.send(embed);
      }
    }
  }
};
