import redis from '@/utils/redis'

export async function rateLimit(
  key: string,
  max: number,
  windowSeconds: number
) {
  const now = Date.now()
  const windowKey = `rl:${key}:${Math.floor(now / (windowSeconds * 1000))}`
  const count = await redis.incr(windowKey)
  if (count === 1) await redis.expire(windowKey, windowSeconds)
  if (count > max) throw new Error('Too many requests')
}
