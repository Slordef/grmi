import { env } from '../config';

export function log(...args: unknown[]) {
  if (env.NODE_ENV === 'test') return;
  if (env.JEST_WORKER_ID !== undefined) return;
  console.log(...args);
}
