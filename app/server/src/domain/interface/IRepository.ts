import { z } from 'zod';

export const IRepository = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    html_url: z.string(),
    secret: z.string(),
    userId: z.number(),
    labels: z.array(z.string()),
});

export type IRepository = z.infer<typeof IRepository>;