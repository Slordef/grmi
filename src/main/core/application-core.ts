import { AppCore } from '../../domain/core/app-core';
import { UseCases } from '../../domain/core/use-cases';
import { ApplicationManager } from './application-manager';
import { AppCorePlugin } from '../../domain/core/app-core-plugin';
import { RunnerManager } from '../runner/runner-manager';
import { Router } from './router';
import { AppRouteStructure } from '../../domain/route/app-route-structure';

export class ApplicationCore implements AppCore {
  private readonly manager: ApplicationManager;

  constructor(...plugins: (new () => AppCorePlugin)[]) {
    this.manager = new ApplicationManager();
    for (const pluginClass of plugins) {
      const plugin = new pluginClass();
      plugin.install(this.manager);
    }
    const fetcher = this.adapter('Fetcher');
    try {
      this.manager.register('RunManager', new RunnerManager(fetcher));
    } catch (error) {
      if (error instanceof Error && error.message != 'Use case already registered.') {
        throw error;
      }
    }
  }

  adapter<T extends keyof UseCases>(name: T): UseCases[T] {
    return this.manager.get(name);
  }

  run(routes: AppRouteStructure[]) {
    const apiServer = this.adapter('ApiServer');
    const router = new Router(this);
    router.addRoutes(apiServer, routes);
    apiServer.start();
  }
}
