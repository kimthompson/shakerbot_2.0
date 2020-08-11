import schedule from 'node-schedule'

const tailsTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal")
  const now = new Date()

  let tailsRule = new schedule.RecurrenceRule()
  tailsRule.dayOfWeek = [2, 5]
  tailsRule.hour = 18
  tailsRule.minute = 0

  schedule.scheduleJob(tailsRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! You should work on your Wondrous Tails journal for Khloe!`)
      console.log(`Wondrous Tails reminder sent to ${member.user.username}!`)
    })
    console.log(`Wondrous Tails reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`)
  })
}

export default tailsTimer
