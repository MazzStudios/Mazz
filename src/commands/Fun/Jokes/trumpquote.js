const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

  constructor(...args) {
    super(...args, { description: 'Returns a random Donald Trump quote.', cooldown: 3 });
  }

  async run(msg) {
    const quote = await fetch('https://api.tronalddump.io/random/quote')
      .then(response => response.json())
      .then(body => body.value)
      .catch(() => { throw 'There was an error. Please try again.'; });
    return msg.send(quote);
  }

};