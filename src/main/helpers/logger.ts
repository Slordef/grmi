export function log(...args: unknown[]) {
    if (process.env.NODE_ENV === 'test') return;
    if (process.env.JEST_WORKER_ID !== undefined) return;
    console.log(...args);
}