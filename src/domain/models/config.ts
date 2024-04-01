import { z } from 'zod';

export const Config = z.object({
  username: z.string(),
  password: z.string()
});

export type Config = z.infer<typeof Config>;
