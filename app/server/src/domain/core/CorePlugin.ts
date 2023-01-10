import { PluginRegister } from './Core';

export abstract class CorePlugin {
    abstract install(register: PluginRegister): Promise<void>;
}