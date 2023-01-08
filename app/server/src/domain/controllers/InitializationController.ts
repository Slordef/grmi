import { Controller } from '../core/Controller';
import { UserEntity } from '../entities/UserEntity';
import { RepositoryEntity } from '../entities/RepositoryEntity';

export class InitializationController extends Controller {
    public readonly type = 'EventInitialization';

    async execute(): Promise<void> {
        const UserDatabases = this.adapter.databaseUser();
        if (UserDatabases.length <= 0) throw new Error('No database found');
        UserDatabases[0].list().then((res) => {
            res.forEach((user) => {
                this.entityContainer.add(new UserEntity(user));
            });
        });

        const RepositoryDatabases = this.adapter.databaseRepository();
        if (RepositoryDatabases.length <= 0) throw new Error('No database found');
        RepositoryDatabases[0].list().then((res) => {
            res.forEach((repository) => {
                this.entityContainer.add(new RepositoryEntity(repository));
            });
        });
    }
}