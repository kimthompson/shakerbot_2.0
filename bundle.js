'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Discord = _interopDefault(require('discord.js'));
var dateFns = require('date-fns');
var schedule = _interopDefault(require('node-schedule'));

const ready = (client) => {
  // TODO: Change BOSSASSBITCH to CREATOR before release
  let creator = client.users.cache.get(process.env.BOSSASSBITCH);
  creator.send("I'm awake!").catch(console.error);
  console.log("I'm awake!");

  client.user.setActivity('FC chat', { type: 'LISTENING' });
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
  console.log(`Shaker says, "${msg}"`);
};

const ping = (message) => {
  message.channel.send('Pong!');
  console.log('Shaker says, "Pong!"');
};

var prefix = "!";
var discussionChannel = "335118290164776961";

const message = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // TODO: Reenable when assignMainRole is working
  //if (mainCommands.includes(command)) {
    //assignMainRole(client, message, command)
  //}

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

const tailsTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal");
  const now = new Date();

  let tailsRule = new schedule.RecurrenceRule();
  tailsRule.dayOfWeek = [2, 5];
  tailsRule.hour = 18;
  tailsRule.minute = 0;

  schedule.scheduleJob(tailsRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! You should work on your Wondrous Tails journal for Khloe!`);
      console.log(`Wondrous Tails reminder sent to ${member.user.username}!`);
    });
    console.log(`Wondrous Tails reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`);
  });
};

const cactpotTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal");
  const now = new Date();

  let cactpotRule = new schedule.RecurrenceRule();
  cactpotRule.dayOfWeek = [6];
  cactpotRule.hour = 20;
  cactpotRule.minute = 0;

  schedule.scheduleJob(cactpotRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! The Jumbo Cactpot drawing is in an hour. Make sure you have your numbers ready!`);
      console.log(`Cactpot reminder sent to ${member.user.username}!`);
    });
    console.log(`Cactpot reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`);
  });
};

const urgentCactpotTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal");
  const now = new Date();

  let urgentCactpotRule = new schedule.RecurrenceRule();
  urgentCactpotRule.dayOfWeek = [6];
  urgentCactpotRule.hour = 20;
  urgentCactpotRule.minute = 55;

  schedule.scheduleJob(urgentCactpotRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! The Jumbo Cactpot drawing is in five minutes! See you at the Gold Saucer!`);
      console.log(`Urgent Cactpot reminder sent to ${member.user.username}!`);
    });
    console.log(`Urgent Cactpot reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`);
  });
};

const fashionTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal");
  const now = new Date();

  let fashionRule = new schedule.RecurrenceRule();
  fashionRule.dayOfWeek = [5];
  fashionRule.hour = 10;
  fashionRule.minute = 0;

  schedule.scheduleJob(fashionRule, async function() {
    let res = await fetch('https://www.reddit.com/r/ffxiv/search.json?q=title:Fashion Report - Full Details - For Week Of&sort=new&restrict_sr=on&limit=1');
    let data = await res.json();
    let reportLink = data.data.children[0].data.url;
    let channel = guild.channels.get(discussionChannel);

    channel.send(`Happy Friday! You're all looking great today! If you'd like to cash in your fashion for some MGP, head over to the Gold Saucer and participate in the Fashion Report this weekend --> ${reportLink}`);
    console.log(`Fashion Report reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`);
  });
};

const startTimers = (client) => {
  tailsTimer(client);
  console.log('Wondrous Tails timer started . . .');

  cactpotTimer(client);
  console.log('Cactpot timer started . . .');

  urgentCactpotTimer(client);
  console.log('Urgent Cactpot timer started . . .');

  fashionTimer(client);
  console.log('Fashion timer started . . .');
};

const client = new Discord.Client();

client.on('ready', () => {
  ready(client);
  startTimers(client);
});

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
