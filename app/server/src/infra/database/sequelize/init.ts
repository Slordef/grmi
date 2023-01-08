import { CorePlugin } from '../../../domain/core/CorePlugin';
import { PluginRegister } from '../../../domain/core/Core';
import { UserAccessor } from './accessor/UserAccessor';
import { RepositoryAccessor } from './accessor/RepositoryAccessor';
import { RepositoryModel, UserModel } from './models';

export class Sequelize extends CorePlugin {

    constructor() {
        super();
    }

    async install({ register }: PluginRegister) {
        await UserModel.sync();
        await RepositoryModel.sync();
        register('databaseUser', () => new UserAccessor());
        register('databaseRepository', () => new RepositoryAccessor());
    }
}