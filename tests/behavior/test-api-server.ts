/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import { ApiServer } from '../../src/domain/usecases/api-server';
import { Controller } from '../../src/domain/controller/controller';

export class TestApiServer implements ApiServer {
    route(controller: Controller): void {
    }

    start(): Promise<void> {
        return Promise.resolve(undefined);
    }

}