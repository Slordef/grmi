import { ApiServer } from '../../app/server/src/domain/usecases/api-server';
import { Controller } from '../../app/server/src/domain/controller/controller';

export class TestApiServer implements ApiServer {
    route(controller: Controller): void {
    }

    start(): Promise<void> {
        return Promise.resolve(undefined);
    }

}