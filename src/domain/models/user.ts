import { z } from 'zod';

export const User = z.object({
  id: z.number(),
  name: z.string(),
  login: z.string(),
  email: z.string().email(),
  token: z.optional(z.string())
});

export type User = z.infer<typeof User>;
