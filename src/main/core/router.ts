import { AppCore } from '../../domain/core/app-core';
import { AppRouter } from '../../domain/core/app-router';
import { ApiServer } from '../../domain/usecases/api-server/api-server';
import { AppRouteStructure } from '../../domain/route/app-route-structure';

export class Router implements AppRouter {
  constructor(private readonly core: AppCore) {}

  addRoutes(apiServer: ApiServer, routes: AppRouteStructure[]) {
    routes.forEach((route) => {
      const method = route.method;
      const path = route.path;
      const middlewareClasses = route.middlewares;
      const controllerClass = route.controller;

      const middlewares = middlewareClasses.map((middleware) => {
        return new middleware(this.core);
      });
      const controller = new controllerClass(this.core);

      apiServer.route({
        method,
        path,
        middlewares,
        controller
      });
    });
  }
}
