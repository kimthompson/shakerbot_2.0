import tailsTimer from './tailsTimer'
import cactpotTimer from './cactpotTimer'
import urgentCactpotTimer from './urgentCactpotTimer'
import fashionTimer from './fashionTimer'

const startTimers = (client) => {
  tailsTimer(client)
  console.log('Wondrous Tails timer started . . .')

  cactpotTimer(client)
  console.log('Cactpot timer started . . .')

  urgentCactpotTimer(client)
  console.log('Urgent Cactpot timer started . . .')

  fashionTimer(client)
  console.log('Fashion timer started . . .')
}

export default startTimers
