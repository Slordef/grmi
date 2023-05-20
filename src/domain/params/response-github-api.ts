import { z } from 'zod';

export const ResponseGithubAPIRegisterRepositoryRunner = z.object({
    body: z.object({
        token: z.string().optional(),
        expires_at: z.string().optional(),
    }),
    status: z.number(),
});

export type ResponseGithubAPIRegisterRepositoryRunner = z.infer<typeof ResponseGithubAPIRegisterRepositoryRunner>;

export const ResponseGithubAPITakeLatestVersionOfRunner = z.object({
    body: z.object({
        body: z.string(),
    }).optional(),
});

export type ResponseGithubAPITakeLatestVersionOfRunner = z.infer<typeof ResponseGithubAPITakeLatestVersionOfRunner>;

