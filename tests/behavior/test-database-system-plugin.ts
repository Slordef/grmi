import { CorePlugin } from '../../src/main/core/core-plugin';
import { CorePluginManager } from '../../src/main/core/core-plugin-manager';
import { TestRepository } from './test-repository';
import { Repository } from '../../src/domain/database/params/repository';
import { User } from '../../src/domain/database/params/user';

export class TestDatabaseSystemPlugin extends CorePlugin {
    constructor(
		private readonly databaseRepository: TestRepository<Repository>,
		private readonly databaseUser: TestRepository<User>
    ) {
        super();
    }

    install(manager: CorePluginManager): void {
        manager.register('DatabaseRepository', this.databaseRepository);
        manager.register('DatabaseUser', this.databaseUser);
    }
}