import { AppRoute } from '../../route/app-route';

export interface ApiServer {
  start(): Promise<void>;
  route(route: AppRoute): void;
}
