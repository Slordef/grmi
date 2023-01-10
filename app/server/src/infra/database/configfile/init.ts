import { CorePlugin } from '../../../domain/core/CorePlugin';
import { PluginRegister } from '../../../domain/core/Core';
import { UserAccessor } from './accessor/UserAccessor';
import { RepositoryAccessor } from './accessor/RepositoryAccessor';

export class ConfigFile extends CorePlugin {
    async install({ register }: PluginRegister): Promise<void> {
        register('databaseUser', () => new UserAccessor());
        register('databaseRepository', () => new RepositoryAccessor());

    }
}