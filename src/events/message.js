import { checkRoles, checkTime, ping } from '../commands/index'
import { prefix, mainCommands } from '../../config.json'

const message = (client, message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (mainCommands.includes(command)) {
    assignMainRole(client, message, command)
  }

  switch (command) {
    case 'time':
      checkTime(message)
      break
    case 'roles': 
      checkRoles(message)
      break
    case 'ping':
      ping(message)
      break
  }
}

export default message
