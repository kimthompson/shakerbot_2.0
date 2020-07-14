import { config } from 'dotenv'
import Discord from 'discord.js'
import {
  message as messageEvent,
  ready as readyEvent
} from './events/index'

config()

const client = new Discord.Client()

client.on('ready', () => {
  readyEvent(client)
})

client.on('message', (message) => {
  messageEvent(client, message)
})

client.login(process.env.TOKEN)
