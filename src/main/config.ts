import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const env = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || '9997',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JEST_WORKER_ID: process.env.JEST_WORKER_ID || undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
