import { CorePlugin } from '../../../main/core/core-plugin';
import { CorePluginManager } from '../../../main/core/core-plugin-manager';
import { UserRepository } from './respository/user-repository';
import { RepositoryRepository } from './respository/repository-repository';
import { Database } from '../../../domain/database/database';
import { User } from '../../../domain/database/params/user';
import { Repository } from '../../../domain/database/params/repository';

export class ConfigfilePlugin extends CorePlugin {
    install(manager: CorePluginManager) {
        manager.register<Database<User>>('DatabaseUser', new UserRepository());
        manager.register<Database<Repository>>('DatabaseRepository', new RepositoryRepository());
    }
}