import { User } from '../../../../domain/params/user';
import { FileManager } from '../file-manager';
import { log } from '../../../../main/helpers/logger';

export class UserRepository implements UserRepository {
  async import(): Promise<User> {
    const data = await FileManager.read<User>('user.json');
    if (User.parse(data)) return data;
    throw new Error('User not found');
  }

  async create(): Promise<User> {
    log('Config File UserAccessor create not available');
    return this.import();
  }

  async get(): Promise<User> {
    return this.import();
  }

  async update(): Promise<User> {
    log('Config File UserAccessor update not available');
    return this.import();
  }

  async delete(): Promise<boolean> {
    log('Config File UserAccessor delete not available');
    return false;
  }

  async list(): Promise<User[]> {
    return [await this.import()];
  }
}
