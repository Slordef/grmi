import { z } from 'zod';

export const Runner = z.object({
    id: z.string()
});

export type IRunner = z.infer<typeof Runner>;