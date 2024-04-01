import { ConfigRepository } from '../../../../domain/usecases/repository/config-repository';
import { Config } from '../../../../domain/models/config';
import { FileManager } from '../file-manager';

export class ConfigFileRepository implements ConfigRepository {
  async create(value: Config): Promise<Config> {
    const configParse = Config.safeParse(value);
    if (!configParse.success) {
      throw new Error('Config invalid');
    }
    await FileManager.write<Config>('config.json', value);
    return configParse.data;
  }
  async get(): Promise<Config> {
    const data = await FileManager.read<Config>('config.json');
    const configParse = Config.safeParse(data);
    if (!configParse.success) {
      throw new Error('Config invalid');
    }
    return configParse.data;
  }
  async update(value: Partial<Config>): Promise<Config> {
    const data = await FileManager.read<Config>('config.json');
    const configParse = Config.safeParse(data);
    if (!configParse.success) {
      throw new Error('Config invalid');
    }
    const newValues = { ...configParse.data, ...value };
    await FileManager.write<Config>('config.json', newValues);
    return newValues;
  }
  async delete(): Promise<boolean> {
    await FileManager.delete('config.json');
    return true;
  }
  async list(): Promise<Config[]> {
    throw new Error('Method not implemented.');
  }
}
