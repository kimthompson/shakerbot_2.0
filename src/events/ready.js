const ready = (client) => {
  // TODO: Change BOSSASSBITCH to CREATOR before release
  let creator = client.users.cache.get(process.env.BOSSASSBITCH)
  creator.send("I'm awake!").catch(console.error)
  console.log("I'm awake!")
  client.user.setActivity('FC chat', { type: 'LISTENING' })
}

export default ready
