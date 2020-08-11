import schedule from 'node-schedule'
import { discussionChannel } from '../../config.json'

const fashionTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal")
  const now = new Date()

  let fashionRule = new schedule.RecurrenceRule()
  fashionRule.dayOfWeek = [5]
  fashionRule.hour = 10
  fashionRule.minute = 0

  schedule.scheduleJob(fashionRule, async function() {
    let res = await fetch('https://www.reddit.com/r/ffxiv/search.json?q=title:Fashion Report - Full Details - For Week Of&sort=new&restrict_sr=on&limit=1')
    let data = await res.json()
    let reportLink = data.data.children[0].data.url
    let channel = guild.channels.get(discussionChannel);

    channel.send(`Happy Friday! You're all looking great today! If you'd like to cash in your fashion for some MGP, head over to the Gold Saucer and participate in the Fashion Report this weekend --> ${reportLink}`)
    console.log(`Fashion Report reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`)
  })
}

export default fashionTimer
