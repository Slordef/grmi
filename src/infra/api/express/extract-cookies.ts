import { Request } from 'express';

export function extractCookies(req: Request) {
  return (
    req.headers.cookie?.split(';').reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key.trim()] = value;
      return acc;
    }, {}) || {}
  );
}
