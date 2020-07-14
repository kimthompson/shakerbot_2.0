import { ping, blah } from '../commands/index'

const message = (client, message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  switch (command) {
    case 'ping':
      ping(message)
      break
    case 'blah':
      blah(message)
      break
  }
}

export default message
