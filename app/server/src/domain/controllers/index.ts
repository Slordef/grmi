import { Controller } from '../core/Controller';
import { EndpointWebhookController } from './EndpointWebhookController';
import { InitializationController } from './InitializationController';

export const ControllerList: () => (new (...args: ConstructorParameters<typeof Controller>) => Controller)[] = () => [
    InitializationController,
    EndpointWebhookController
];