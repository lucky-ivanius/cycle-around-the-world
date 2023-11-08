import { config } from 'dotenv';

config();

export const redisConfig = {
  url: process.env.REDIS_URL,
};
