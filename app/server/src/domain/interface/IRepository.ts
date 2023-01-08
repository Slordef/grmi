import { z } from 'zod';

export const IRepository = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.object({
        id: z.number(),
        login: z.string()
    }),
    html_url: z.string()
});

export type IRepository = z.infer<typeof IRepository>;