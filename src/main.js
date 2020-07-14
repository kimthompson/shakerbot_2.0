import { config } from 'dotenv'
import Discord from 'discord.js'
import { messageEvent } from './events/index'

config()

const client = new Discord.Client()

client.on('message', (message) => {
  messageEvent(client, message)
})

client.login(process.env.TOKEN)
