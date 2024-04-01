import { AppCorePluginManager } from '../../../domain/core/app-core-plugin-manager';
import { UserFileRepository } from './respository/user-file-repository';
import { RepositoryFileRepository } from './respository/repository-file-repository';
import { AppCorePlugin } from '../../../domain/core/app-core-plugin';
import { ConfigFileRepository } from './respository/config-file-repository';

export class ConfigfilePlugin implements AppCorePlugin {
  install(manager: AppCorePluginManager) {
    manager.register('UserRepository', new UserFileRepository());
    manager.register('RepositoryRepository', new RepositoryFileRepository());
    manager.register('ConfigRepository', new ConfigFileRepository());
  }
}
