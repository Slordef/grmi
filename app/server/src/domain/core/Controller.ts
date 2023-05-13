import { EventController } from './EventController';
import { Gateway } from './Gateway';
import { EntityContainer } from './EntityContainer';
import { AdapterInstance } from './Core';
import { RunnerManager } from '../runner/RunnerManager';

export type RegisterController = {
    adapter: AdapterInstance,
    gateway: Gateway,
    entityContainer: EntityContainer,
    manager: RunnerManager
};

export abstract class Controller {
    public abstract readonly type: (new (...args: never[]) => EventController) | string;
    public adapter: AdapterInstance;
    public gateway: Gateway;
    public entities: EntityContainer;
    public manager: RunnerManager;

    constructor(private register: RegisterController) {
        this.adapter = register.adapter;
        this.gateway = register.gateway;
        this.entities = register.entityContainer;
        this.manager = register.manager;
    }

    public abstract execute(event: EventController): void;
}

