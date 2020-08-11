import schedule from 'node-schedule'

const urgentCactpotTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal")
  const now = new Date()

  let urgentCactpotRule = new schedule.RecurrenceRule()
  urgentCactpotRule.dayOfWeek = [6]
  urgentCactpotRule.hour = 20
  urgentCactpotRule.minute = 55

  schedule.scheduleJob(urgentCactpotRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! The Jumbo Cactpot drawing is in five minutes! See you at the Gold Saucer!`)
      console.log(`Urgent Cactpot reminder sent to ${member.user.username}!`)
    })
    console.log(`Urgent Cactpot reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`)
  })
}

export default urgentCactpotTimer
