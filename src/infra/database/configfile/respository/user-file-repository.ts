import { User } from '../../../../domain/models/user';
import { FileManager } from '../file-manager';
import { UserRepository } from '../../../../domain/usecases/repository/user-repository';

export class UserFileRepository implements UserRepository {
  async import(): Promise<User[]> {
    if (!(await FileManager.exists('users.json'))) {
      return [];
    }
    const data = await FileManager.read<User[]>('users.json').catch(() => []);
    return data?.filter((user: User) => User.safeParse(user).success);
  }

  async create(value: User): Promise<User> {
    const userParse = User.safeParse(value);
    if (!userParse.success) {
      throw new Error('User invalid');
    }
    if (!(await FileManager.exists('users.json'))) {
      await FileManager.write('users.json', [value]);
      return value;
    } else {
      const list = await this.import();
      list.push(value);
      await FileManager.write('users.json', list);
      return value;
    }
  }

  async get(id: number): Promise<User | null> {
    const list = await this.import();
    const data = list.find((user) => user.id === id);
    const userParse = User.safeParse(data);
    if (!userParse.success) {
      return null;
    }
    return userParse.data;
  }

  async update(user: Partial<User>): Promise<User | null> {
    const list = await this.import();
    const index = list.findIndex((d) => d.id === user.id);
    if (index === -1) {
      return null;
    }
    const data = list[index];
    const userParse = User.safeParse(data);
    if (!userParse.success) {
      return null;
    }
    list[index] = { ...data, ...user };
    await FileManager.write('users.json', list);
    return list[index];
  }

  async delete(id: number): Promise<boolean> {
    const list = await this.import();
    const index = list.findIndex((d) => d.id === id);
    if (index === -1) {
      return false;
    }
    list.splice(index, 1);
    await FileManager.write('users.json', list);
    return true;
  }

  async list(): Promise<User[]> {
    return this.import();
  }
}
