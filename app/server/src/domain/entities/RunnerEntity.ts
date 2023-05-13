import { Entity } from '../core/Entity';
import { RunnerContainer } from '../runner/RunnerContainer';

export class RunnerEntity extends Entity {
    private _container: RunnerContainer | undefined;

    get container(): RunnerContainer | undefined {
        return this._container;
    }

    set container(value: RunnerContainer | undefined) {
        if (!value) return;
        this._container = value;
    }
}