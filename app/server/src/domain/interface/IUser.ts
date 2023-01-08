import { z } from 'zod';

export const IUser = z.object({
    id: z.number(),
    name: z.string(),
    login: z.string(),
    email: z.string().email(),
    token: z.optional(z.string())
});

export type IUser = z.infer<typeof IUser>;