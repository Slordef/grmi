import { Core } from '../core/core';
import { Controller } from '../../domain/controller/controller';

export abstract class Factory {
    constructor(protected readonly core: Core) {
    }

	abstract create(): unknown;
}

export abstract class ControllerFactory extends Factory {
	abstract create(): Controller;
}