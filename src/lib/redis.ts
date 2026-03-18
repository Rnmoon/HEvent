import { Redis } from '@upstash/redis';

// Note: Ensure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set in your environment variables.
// Read https://upstash.com/docs/redis/overall/getstarted for instructions on getting these values.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});
