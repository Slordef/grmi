import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

export const env: {
  BASE_SRC: string;
  HOST: string;
  PORT: string;
  NODE_ENV: string;
  JEST_WORKER_ID: string | undefined;
  JWT_SECRET: string;
  COOKIE_SECURE: boolean;
  COOKIE_SAME_SITE: 'none' | 'lax';
} = {
  BASE_SRC: path.resolve(__dirname, '..'),
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JEST_WORKER_ID: process.env.JEST_WORKER_ID || undefined,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_SAME_SITE: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
};
