import { CorePlugin } from '../../src/main/core/core-plugin';
import { CorePluginManager } from '../../src/main/core/core-plugin-manager';
import { Fetcher } from '../../src/domain/request/fetcher';
import { TestFetcher } from './test-fetcher';

export class TestFetcherPlugin extends CorePlugin {
    constructor(
		private readonly fetcher: TestFetcher
    ) {
        super();
    }

    install(manager: CorePluginManager): void {
        manager.register<Fetcher>('Fetcher', this.fetcher);
    }

}