import { CorePlugin } from '../../../main/core/core-plugin';
import { CorePluginManager } from '../../../main/core/core-plugin-manager';
import { AxiosFetcher } from './axios-fetcher';
import { Fetcher } from '../../../domain/request/fetcher';

export class AxiosPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register<Fetcher>('Fetcher', new AxiosFetcher());
    }

}