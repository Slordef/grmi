import { CorePlugin } from '../../app/server/src/main/core/core-plugin';
import { CorePluginManager } from '../../app/server/src/main/core/core-plugin-manager';
import { TestRepository } from './test-repository';
import { Repository } from '../../app/server/src/domain/database/params/repository';
import { User } from '../../app/server/src/domain/database/params/user';

export class TestDatabaseSystemPlugin extends CorePlugin {
    install(manager: CorePluginManager): void {
        manager.register('DatabaseRepository', new TestRepository<Repository>());
        manager.register('DatabaseUser', new TestRepository<User>());
    }
}