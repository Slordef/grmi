import { z } from 'zod';

export const IResponseGithubAPIRegisterRepositoryRunner = z.object({
    token: z.string(),
    expires_at: z.string(),
});

export type IResponseGithubAPIRegisterRepositoryRunner = z.infer<typeof IResponseGithubAPIRegisterRepositoryRunner>;