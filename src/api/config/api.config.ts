import { config } from 'dotenv';

config();

export const apiConfig = {
  port: parseInt(process.env.PORT!),
  origin: process.env.ORIGIN!,
};
