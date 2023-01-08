import { EventController } from '../core/EventController';
import { Endpoint } from '../core/Endpoint';
import { IWebhook } from '../interface/IWebhook';

export class EventEndpointWebhook extends EventController {
    constructor(public endpoint: Endpoint<IWebhook>) {
        super();
    }
}