import { z } from 'zod';

export const IRunner = z.object({
    id: z.string()
});

export type IRunner = z.infer<typeof IRunner>;