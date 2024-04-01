import { AppCorePluginManager } from './app-core-plugin-manager';

export interface AppCorePlugin {
  install(manager: AppCorePluginManager): void;
}
