import { z } from 'zod';

export const PostConfig = z.object({
  username: z.string(),
  password: z.string(),
  passwordConfirm: z.string()
});

export type PostConfig = z.infer<typeof PostConfig>;
