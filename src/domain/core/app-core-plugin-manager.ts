import { UseCases } from './use-cases';

export interface AppCorePluginManager {
  register<T extends keyof UseCases>(name: T, implementation: UseCases[T]): void;
  get<T extends keyof UseCases>(name: T): UseCases[T];
}
