import Discord from 'discord.js'
import config from '../.config.json'

const client = new Discord.Client()

client.on('ready', () => {
  console.log('beep boop let\'s go')
})

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  switch (command) {
    case 'ping':
      message.channel.send('Pong!')
      break
    case 'blah':
      message.channel.send('Meh.')
      break
  }
})

client.login(config.token)
