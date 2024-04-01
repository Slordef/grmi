import { z } from 'zod';

export const Runner = z.object({
  id: z.string()
});

export type Runner = z.infer<typeof Runner>;
