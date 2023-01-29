import { Controller } from '../core/Controller';
import { UserEntity } from '../entities/UserEntity';
import { RepositoryEntity } from '../entities/RepositoryEntity';

export class InitializationController extends Controller {
    public readonly type = 'EventInitialization';

    async execute(): Promise<void> {
        console.log('Initialization');
        const UserDatabases = this.adapter.databaseUser();
        if (!UserDatabases) throw new Error('No database found');
        UserDatabases.list().then((res) => {
            res.forEach((user) => {
                this.entities.add(new UserEntity(user));
            });
        });

        const RepositoryDatabases = this.adapter.databaseRepository();
        if (!RepositoryDatabases) throw new Error('No database found');
        RepositoryDatabases.list().then((res) => {
            res.forEach((repository) => {
                this.entities.add(new RepositoryEntity(repository));
            });
        });
    }
}