import { User } from '../../../../domain/models/user';
import { FileManager } from '../file-manager';
import { UserRepository } from '../../../../domain/usecases/repository/user-repository';

export class UserFileRepository implements UserRepository {
  async import(): Promise<User> {
    const data = await FileManager.read<User>('user.json');
    if (User.parse(data)) return data;
    throw new Error('User not found');
  }

  async create(value: User): Promise<User> {
    const userParse = User.safeParse(value);
    if (!userParse.success) {
      throw new Error('User invalid');
    }
    if (!(await FileManager.exists('user.json'))) {
      await FileManager.write('user.json', value);
      return value;
    } else {
      throw new Error('User already exists');
    }
  }

  async get(): Promise<User> {
    return this.import();
  }

  async update(user: Partial<User>): Promise<User> {
    const data = await this.import();
    const userParse = User.safeParse(data);
    if (!userParse.success) {
      throw new Error('User invalid');
    }
    const newValue = { ...data, ...user };
    await FileManager.write('user.json', newValue);
    return newValue;
  }

  async delete(): Promise<boolean> {
    if (await FileManager.exists('user.json')) {
      await FileManager.delete('user.json');
      return true;
    }
    return false;
  }

  async list(): Promise<User[]> {
    return [await this.import()];
  }
}
