import { UseCases } from './use-cases';
import { AppRouteStructure } from '../route/app-route-structure';

export interface AppCore {
  adapter<T extends keyof UseCases>(name: T): UseCases[T];
  run(routes: AppRouteStructure[]): void;
}
