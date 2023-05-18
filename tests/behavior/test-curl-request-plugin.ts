import { CorePlugin } from '../../app/server/src/main/core/core-plugin';
import { CorePluginManager } from '../../app/server/src/main/core/core-plugin-manager';
import { TestFetcher } from './test-fetcher';

export class TestCurlRequestPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register('fetch', new TestFetcher());
    }
}