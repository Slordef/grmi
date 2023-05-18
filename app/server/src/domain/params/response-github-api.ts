import { z } from 'zod';

export const ResponseGithubAPIRegisterRepositoryRunner = z.object({
    token: z.string(),
    expires_at: z.string(),
});

export type ResponseGithubAPIRegisterRepositoryRunner = z.infer<typeof ResponseGithubAPIRegisterRepositoryRunner>;