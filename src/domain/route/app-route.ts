import { AppHandler } from '../core/app-handler';
import { AppRouteMethod } from './app-route-method';

export interface AppRoute {
  method: AppRouteMethod;
  path: string;
  middlewares: AppHandler[];
  controller: AppHandler;
}
