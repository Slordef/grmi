import { CorePluginManager } from './core-plugin-manager';
import { CorePlugin } from './core-plugin';
import { ApiServer } from '../../domain/usecases/api-server';
import { Router } from '../router/router';
import { RunnerManager } from '../runner/runner-manager';

export class Core {
    private readonly corePluginManager: CorePluginManager;

    constructor(...args: (new () => CorePlugin)[]) {
        this.corePluginManager = new CorePluginManager();
        for (const plugin of args) {
            new plugin().install(this.corePluginManager);
        }
        this.corePluginManager.register<RunnerManager>('RunnerManager', new RunnerManager(this));
    }

    adapter<T>(useCase: string): T {
        return this.corePluginManager.get(useCase);
    }

    run() {
        const apiServer = this.adapter<ApiServer>('ApiServer');
        const router = new Router(this, apiServer.route.bind(apiServer));
        router.addRoutes();
        apiServer.start();
    }
}