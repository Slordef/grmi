import { CorePluginManager } from './core-plugin-manager';

export abstract class CorePlugin {
	abstract install(manager: CorePluginManager): void;
}