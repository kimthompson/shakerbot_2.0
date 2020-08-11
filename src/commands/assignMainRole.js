// TODO: Someday, when I can figure out how to give Shaker the authority

import { roleIds } from '../../config.json'

const assignMainRole = (client, message, command) => {
  const memberRoles = message.member.roles._roles
  const allRoles = message.guild.roles.cache
  const mainRoleIds = new Set([roleIds.healermain, roleIds.dpsmain, roleIds.tankmain])
  const desiredMainRoleId = roleIds[command]

  mainRoleIds.forEach((id) => {
    message.member.roles.remove(id)
  })

  message.member.roles.add(desiredMainRoleId)

  let currentMainRole = memberRoles.find((role) => mainRoleIds.has(role.id))
  let desiredMainRole = allRoles.find((role) => role.id === desiredMainRoleId)

  if (currentMainRole == null) {
    message.channel.send(`Set to ${desiredMainRole.name}`)
    console.log(`Shaker says, "Set to ${desiredMainRole.name}"`)
  }

  message.channel.send(`Switched from a ${currentMainRole.name} to a ${desiredMainRole.name}`)
  console.log(`Shaker says, "Switched from a ${currentMainRole.name} to a ${desiredMainRole.name}"`)
}

export default assignMainRole
