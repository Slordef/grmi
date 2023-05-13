import { Core } from './Core';
import { ControllerList } from '../controllers';
import { EventController } from './EventController';
import { Controller } from './Controller';
import { RunnerManager } from '../runner/RunnerManager';

export class Controllers {
    private actions: Controller[] = [];

    private readonly manager: RunnerManager;

    constructor(private core: Core) {
        this.manager = new RunnerManager(this.core);
        this.actions = ControllerList().map(controller => new controller({
            adapter: this.core.adapter,
            gateway: this.core.gateway,
            entityContainer: this.core.entityContainer,
            manager: this.manager,
        }));
    }

    public trigger(event: EventController | string) {
        let found = false;
        this.actions.forEach(action => {
            if (typeof event == 'string' && event == action.type || typeof action.type != 'string' && event instanceof action.type) {
                try {
                    found = true;
                    action.execute(event);
                } catch (e) {
                    console.error(e);
                }
            }
        });
        if (!found) {
            console.error(`Event ${event} not found.`);
        }
    }
}