import { AppCorePlugin } from '../../../domain/core/app-core-plugin';
import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { BcryptAdapter } from './bcrypt-adapter';

export class BcryptPlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager): void {
    const bcryptAdapter = new BcryptAdapter();

    manager.register('Hasher', bcryptAdapter);
    manager.register('HashComparer', bcryptAdapter);
  }
}
