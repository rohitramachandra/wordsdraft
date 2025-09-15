import Redis from 'ioredis'

declare global {
  // eslint-disable-next-line no-var
  var __redisClient: Redis | undefined
}

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL environment variable is required')
}

const redisUrl = process.env.REDIS_URL

// Common recommended options
const redisOptions = {
  enableAutoPipelining: true,
  tls: { rejectUnauthorized: false },
}

let redis: Redis

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(redisUrl, redisOptions)
} else {
  if (!global.__redisClient) {
    global.__redisClient = new Redis(redisUrl, redisOptions)
  }
  redis = global.__redisClient
}

// Basic error logging
redis.on('error', (err) => {
  // keep it minimal; do not leak credentials in logs
  console.error('Redis error:', err.message || err)
})

export default redis
