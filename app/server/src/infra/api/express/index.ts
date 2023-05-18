import { CorePlugin } from '../../../main/core/core-plugin';
import { CorePluginManager } from '../../../main/core/core-plugin-manager';
import { ExpressApiServer } from './express-api-server';
import { ApiServer } from '../../../domain/usecases/api-server';

export class ExpressPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register<ApiServer>('ApiServer', new ExpressApiServer());
    }
}