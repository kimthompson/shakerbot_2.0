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

const message = (client, message) => {
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

const ready = (client) => {
  // TODO: Change BOSSASSBITCH to CREATOR before release
  let creator = client.users.cache.get(process.env.BOSSASSBITCH);
  creator.send("I'm awake!").catch(console.error);
  console.log("I'm awake!");
  client.user.setActivity('FC chat', { type: 'LISTENING' });
};

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  ready(client);
});

client.on('message', (message$1) => {
  message(client, message$1);
});

client.login(process.env.TOKEN);
