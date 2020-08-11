import { format } from 'date-fns'

const checkTime = (message) => {
  let now = new Date()
  let msg = `It is now ${format(now, "hh:mm a MM/dd/yyyy")}`

  message.channel.send(msg)
  console.log(`Shaker says, "${msg}"`)
}

export default checkTime
