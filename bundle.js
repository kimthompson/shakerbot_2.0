'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Discord = _interopDefault(require('discord.js'));

var token = "NzMwOTUxMzE2MjA5NDAxODc2.XwfHoQ.1qsP655Mwces7TA_MjzeFbrTbdI";
var prefix = "!";
var config = {
	token: token,
	prefix: prefix
};

const client = new Discord.Client();

client.on('ready', () => {
  console.log('beep boop let\'s go');
});

client.on('message', (message) => {
  if(!message.content.startsWith(config.prefix) || message.author.bot) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch(command) {
    case 'ping':
      message.channel.send('Pong!');
      break
    case 'blah':
      message.channel.send('Meh.');
      break
  }
});

client.login(config.token);
