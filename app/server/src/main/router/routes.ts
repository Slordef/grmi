import { ControllerFactory } from '../factories/factory';
import { WebhookControllerFactory } from '../factories/controller/webhook-controller-factory';
import { Core } from '../core/core';

export const routes: { new(core: Core): ControllerFactory }[] = [WebhookControllerFactory];