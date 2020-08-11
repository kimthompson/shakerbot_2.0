const checkRoles = (message) => {
  let response = "Your roles are:\n"
  message.member.roles._roles.map((role) => {
    response += `\n* ${role.name}`
  })

  message.channel.send(response)
  console.log(`Shaker says, "${response}"`)
}

export default checkRoles
