import { z } from 'zod';

export const Repository = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    html_url: z.string(),
    secret: z.string(),
    userId: z.number(),
    labels: z.array(z.string()),
});

export type Repository = z.infer<typeof Repository>;