export class CorePluginManager {
    adapters: Map<string, any> = new Map();

    register<T>(useCase: string, implementation: T) {
        if (this.adapters.has(useCase)) {
            throw new Error('Use case already registered.');
        }
        this.adapters.set(useCase, implementation);
    }

    get<T>(useCase: string): T {
        if (!this.adapters.has(useCase)) {
            throw new Error(`Use case not registered: ${useCase}.`);
        }
        return this.adapters.get(useCase);
    }
}