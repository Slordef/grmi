import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

export const env = {
  BASE_SRC: path.resolve(__dirname, '..'),
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JEST_WORKER_ID: process.env.JEST_WORKER_ID || undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
