import { z } from 'zod';

export const PostUser = z.object({
  id: z.string(),
  name: z.string(),
  login: z.string(),
  email: z.string(),
  token: z.string()
});
