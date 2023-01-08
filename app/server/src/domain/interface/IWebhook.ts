import { z } from 'zod';
import { IRepository } from './IRepository';

export const IWebhook = z.object({
    action: z.string(),
    workflow_job: z.object({
        id: z.number(),
        run_id: z.number(),
        workflow_name: z.string(),
        status: z.string(),
        labels: z.array(z.string()),
    }),
    repository: IRepository,
});

export type IWebhook = z.infer<typeof IWebhook>;