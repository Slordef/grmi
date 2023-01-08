import { Core } from './Core';
import { ControllerList } from '../controllers/ControllerList';
import { EventController } from './EventController';
import { Controller } from './Controller';
import { RunnerManager } from './RunnerManager';

export class Controllers {
    private actions: Controller[] = [];

    private manager: RunnerManager;

    constructor(private core: Core) {
        this.manager = new RunnerManager();
        this.actions = ControllerList().map(controller => new controller({
            adapter: this.core.adapter,
            gateway: this.core.gateway,
            entityContainer: this.core.entityContainer,
            manager: this.manager,
        }));
    }

    public trigger(event: EventController | string) {
        this.actions.forEach(action => {
            if (typeof event == 'string' && event == action.type || typeof action.type != 'string' && event instanceof action.type) {
                try {
                    action.execute(event);
                } catch (e) {
                    console.error(e);
                }
            }
        });
    }
}