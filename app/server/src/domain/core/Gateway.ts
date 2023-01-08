import { Core } from './Core';
import { EventController } from './EventController';

export class Gateway {
    constructor(public core: Core) {
    }

    send(event: EventController) {
        this.core.receiveEvent(event);
    }
}