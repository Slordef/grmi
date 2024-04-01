import { ApiServer } from '../usecases/api-server/api-server';
import { AppRouteStructure } from '../route/app-route-structure';

export interface AppRouter {
  addRoutes(apiServer: ApiServer, routes: AppRouteStructure[]): void;
}
