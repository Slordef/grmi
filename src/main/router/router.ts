import { ApiServer } from '../../domain/usecases/api-server';
import { routes } from './routes';
import { Core } from '../core/core';

export class Router {
    constructor(private readonly core: Core, private readonly addRoute: ApiServer['route']) {
    }

    addRoutes() {
        routes.forEach((route) => {
            const factory = new route(this.core);
            this.addRoute(factory.create());
        });
    }
}