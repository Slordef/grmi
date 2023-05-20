import { WebhookController } from '../../controller/webhook-controller';
import { Database } from '../../../domain/database/database';
import { Repository } from '../../../domain/database/params/repository';
import { ControllerFactory } from '../factory';
import { WebhookValidation } from '../../validation/webhook-validation';
import { Fetcher } from '../../../domain/request/fetcher';
import { RunnerManager } from '../../runner/runner-manager';
import { User } from '../../../domain/database/params/user';

export class WebhookControllerFactory extends ControllerFactory {
    create(): WebhookController {
        return new WebhookController(
            this.core.adapter<Database<Repository>>('DatabaseRepository'),
            this.core.adapter<Database<User>>('DatabaseUser'),
            new WebhookValidation(),
            this.core.adapter<Fetcher>('Fetcher'),
            this.core.adapter<RunnerManager>('RunnerManager')
        );
    }
}