import { AppCorePluginManager } from '../../domain/core/app-core-plugin-manager';
import { UseCases } from '../../domain/core/use-cases';

export class ApplicationManager implements AppCorePluginManager {
  private adapters: Partial<UseCases> = {};

  register<T extends keyof UseCases>(name: T, implementation: UseCases[T]) {
    if (name in this.adapters) {
      throw new Error('Use case already registered.');
    }
    this.adapters = { ...this.adapters, [name]: implementation };
  }

  get<T extends keyof UseCases>(name: T): UseCases[T] {
    if (!(name in this.adapters)) {
      throw new Error(`Use case not registered: ${name}.`);
    }
    const useCase = this.adapters[name];
    if (!useCase) {
      throw new Error(`Use case not found: ${name}.`);
    }
    return useCase;
  }
}
