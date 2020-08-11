import schedule from 'node-schedule'

const cactpotTimer = (client) => {
  const guild = client.guilds.cache.get(process.env.GUILDID);
  const role = guild.roles.cache.find(r => r.name === "Journal")
  const now = new Date()

  let cactpotRule = new schedule.RecurrenceRule()
  cactpotRule.dayOfWeek = [6]
  cactpotRule.hour = 20
  cactpotRule.minute = 0

  schedule.scheduleJob(cactpotRule, function() {
    role.members.forEach(async member => {
      await member.user.send(`Hello, ${member.user.username}! The Jumbo Cactpot drawing is in an hour. Make sure you have your numbers ready!`)
      console.log(`Cactpot reminder sent to ${member.user.username}!`)
    })
    console.log(`Cactpot reminder ran at ${format(now, "hh:mm a MM/dd/yy")}`)
  })
}

export default cactpotTimer
