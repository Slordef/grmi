import { CorePluginManager } from '../../src/main/core/core-plugin-manager';

class TestCorePluginManager extends CorePluginManager {
    constructor(private readonly mock = jest.fn()) {
        super();
    }

    register<T>(useCase: string, implementation: T) {
        this.mock(useCase, implementation);
    }
}

export const mocking = (mock = jest.fn()) => {
    return new TestCorePluginManager(mock);
};