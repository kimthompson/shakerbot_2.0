'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var dotenv = require('dotenv');
var Discord = _interopDefault(require('discord.js'));

const ping = (message) => {
  message.channel.send('Pong!');
};

const blah = (message) => {
  message.channel.send('Meh.');
};

const messageEvent = (client, message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'ping':
      ping(message);
      break
    case 'blah':
      blah(message);
      break
  }
};

dotenv.config();

console.log('env', process.env.TOKEN);

const client = new Discord.Client();

client.on('message', (message) => {
  messageEvent(client, message);
});

client.login(process.env.TOKEN);
