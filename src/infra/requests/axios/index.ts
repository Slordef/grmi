import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { AxiosFetcher } from './axios-fetcher';
import { AppCorePlugin } from '../../../domain/core/app-core-plugin';

export class AxiosPlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager): void {
    manager.register('Fetcher', new AxiosFetcher());
  }
}
