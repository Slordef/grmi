import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { ExpressApiServer } from './express-api-server';
import { AppCorePlugin } from '../../../domain/core/app-core-plugin';

export class ExpressPlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager): void {
    manager.register('ApiServer', new ExpressApiServer());
  }
}
