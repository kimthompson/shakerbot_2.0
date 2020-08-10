import { ping, blah } from '../commands/index'
import { prefix } from '../../config.json'

const message = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
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
