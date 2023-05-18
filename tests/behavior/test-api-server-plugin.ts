import { CorePlugin } from '../../app/server/src/main/core/core-plugin';
import { CorePluginManager } from '../../app/server/src/main/core/core-plugin-manager';
import { TestApiServer } from './test-api-server';

export class TestApiServerPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register('ApiServer', new TestApiServer());
    }
}