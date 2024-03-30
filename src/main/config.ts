export const env = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JEST_WORKER_ID: process.env.JEST_WORKER_ID || undefined
};
