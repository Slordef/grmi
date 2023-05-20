import { CorePluginManager } from './core-plugin-manager';
import { CorePlugin } from './core-plugin';
import { ApiServer } from '../../domain/usecases/api-server';
import { Router } from '../router/router';
import { RunnerManager } from '../runner/runner-manager';
import { Fetcher } from '../../domain/request/fetcher';

export class Core {
    private readonly corePluginManager: CorePluginManager;

    constructor(...args: CorePlugin[]) {
        this.corePluginManager = new CorePluginManager();
        for (const plugin of args) {
            plugin.install(this.corePluginManager);
        }
        const fetcher = this.adapter<Fetcher>('Fetcher');
        this.corePluginManager.register<RunnerManager>('RunnerManager', new RunnerManager(fetcher));
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