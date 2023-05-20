import { CorePlugin } from '../../src/main/core/core-plugin';
import { CorePluginManager } from '../../src/main/core/core-plugin-manager';
import { TestApiServer } from './test-api-server';

export class TestApiServerPlugin extends CorePlugin {
    constructor(private readonly testApiServer: TestApiServer) {
        super();
    }

    install(manager: CorePluginManager): void {
        manager.register('ApiServer', this.testApiServer);
    }
}