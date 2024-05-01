import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://live-beagle-46555.upstash.io',
  token: 'AbXbAAIncDFlMjg1MWViYTZiODg0MzE1YTY1MzBhYjczMjhjN2QzMHAxNDY1NTU',
})



export default redis