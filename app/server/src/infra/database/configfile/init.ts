import { CorePlugin } from '../../../domain/core/CorePlugin';
import { PluginRegister } from '../../../domain/core/Core';
import { UserAccessor } from './accessor/UserAccessor';
import { RepositoryAccessor } from './accessor/RepositoryAccessor';

export class ConfigFile extends CorePlugin {
    install({ register }: PluginRegister) {
        register('databaseUser', () => new UserAccessor());
        register('databaseRepository', () => new RepositoryAccessor());

    }
}