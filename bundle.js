'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Discord = _interopDefault(require('discord.js'));
var dateFns = require('date-fns');

const ready = (client) => {
  // TODO: Change BOSSASSBITCH to CREATOR before release
  let creator = client.users.cache.get(process.env.BOSSASSBITCH);
  creator.send("I'm awake!").catch(console.error);
  console.log("I'm awake!");

  client.user.setActivity('FC chat', { type: 'LISTENING' });

  // TODO: Start timers
};

const checkRoles = (message) => {
  let response = "Your roles are:\n";
  message.member.roles._roles.map((role) => {
    response += `\n* ${role.name}`;
  });

  message.channel.send(response);
  console.log(`Shaker says, "${response}"`);
};

const checkTime = (message) => {
  let now = new Date();
  let msg = `It is now ${dateFns.format(now, "hh:mm a MM/dd/yyyy")}`;

  message.channel.send(msg);
  console.log(`Shaker says, ${msg}`);
};

const ping = (message) => {
  message.channel.send('Pong!');
  console.log('Shaker says, "Pong!"');
};

var prefix = "!";
var mainCommands = [
	"tankmain",
	"healermain",
	"dpsmain"
];

const message = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (mainCommands.includes(command)) {
    assignMainRole(client, message, command);
  }

  switch (command) {
    case 'time':
      checkTime(message);
      break
    case 'roles': 
      checkRoles(message);
      break
    case 'ping':
      ping(message);
      break
  }
};

const disconnect = () => {
  console.log(
    `The WebSocket has closed and Shaker will no longer attempt to reconnect`
  );
};

const error = (error) => {
  console.error(`Shaker's WebSocket encountered a connection error: ${error}`);
};

const resume = (replayed) => {
  console.log(`Shaker resumed the WebSocket: ${replayed}`);
};

const warn = (info) => {
  console.log(`warn: ${info}`);
};

const client = new Discord.Client();

client.on('ready', () => { ready(client); });

client.on('message', (message$1) => {
  message(client, message$1);
});

client.on('shardDisconnect', () => {
  disconnect();
});

client.on('shardReconnecting', () => {
  reconnectingEvent();
});

client.on('shardResume', (replayed) => {
  resume(replayed);
});

client.on('shardError', (error$1) => {
  error(error$1);
});

client.on('warn', (info) => {
  warn(info);
});

client.login(process.env.TOKEN).catch((error) => console.error(error));
