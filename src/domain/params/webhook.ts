import { z } from 'zod';

export const Webhook = z.object({
  action: z.string(),
  workflow_job: z.object({
    id: z.number(),
    run_id: z.number(),
    workflow_name: z.string(),
    status: z.string(),
    labels: z.array(z.string())
  }),
  repository: z.object({
    id: z.number(),
    name: z.string(),
    owner: z.object({
      id: z.number(),
      login: z.string()
    }),
    html_url: z.string()
  })
});

export type Webhook = z.infer<typeof Webhook>;

export const ValidWebhook = z.object({
  body: z.string(),
  secret: z.string(),
  signature: z.string()
});

export type ValidWebhook = z.infer<typeof ValidWebhook>;
