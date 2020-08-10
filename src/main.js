import Discord from 'discord.js'
import {
  message as messageEvent,
  ready as readyEvent,
  disconnect as disconnectEvent,
  resume as resumeEvent,
  error as errorEvent,
  warn as warnEvent
} from './events/index'

const client = new Discord.Client()

client.on('ready', () => { readyEvent(client) })

client.on('message', (message) => {
  messageEvent(client, message)
})

client.on('shardDisconnect', () => {
  disconnectEvent()
})

client.on('shardReconnecting', () => {
  reconnectingEvent()
})

client.on('shardResume', (replayed) => {
  resumeEvent(replayed)
})

client.on('shardError', (error) => {
  errorEvent(error)
})

client.on('warn', (info) => {
  warnEvent(info)
})

client.login(process.env.TOKEN).catch((error) => console.error(error))
