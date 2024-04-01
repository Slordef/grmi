import { AppHandler } from '../core/app-handler';
import { AppCore } from '../core/app-core';
import { AppRouteMethod } from './app-route-method';

export type AppRouteStructure = {
  method: AppRouteMethod;
  path: string;
  middlewares: { new (core: AppCore): AppHandler }[];
  controller: { new (core: AppCore): AppHandler };
};
