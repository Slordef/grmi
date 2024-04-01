import { z } from 'zod';

export const PostRepository = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  html_url: z.string(),
  secret: z.string(),
  userId: z.string(),
  labels: z.string()
});
