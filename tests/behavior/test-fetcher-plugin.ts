import { CorePlugin } from '../../app/server/src/main/core/core-plugin';
import { CorePluginManager } from '../../app/server/src/main/core/core-plugin-manager';
import { Fetcher } from '../../app/server/src/domain/request/fetcher';
import { TestFetcher } from './test-fetcher';

export class TestFetcherPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register<Fetcher>('Fetcher', new TestFetcher());
    }

}