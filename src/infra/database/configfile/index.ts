import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { UserRepository } from './respository/user-repository';
import { RepositoryRepository } from './respository/repository-repository';
import { AppCorePlugin } from '../../../domain/core/app-core-plugin';

export class ConfigfilePlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager) {
    manager.register('UserRepository', new UserRepository());
    manager.register('RepositoryRepository', new RepositoryRepository());
  }
}
