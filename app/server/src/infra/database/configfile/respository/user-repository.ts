import { Database } from '../../../../domain/database/database';
import { User } from '../../../../domain/database/params/user';
import { FileManager } from '../file-manager';

export class UserRepository implements Database<User> {

    async import(): Promise<User> {
        const data = await FileManager.read<User>('user.json');
        if (User.parse(data)) return data;
        throw new Error('User not found');
    }

    async create(): Promise<User> {
        console.log('Config File UserAccessor create not available');
        return this.import();
    }

    async get(): Promise<User> {
        return this.import();
    }

    async update(): Promise<User> {
        console.log('Config File UserAccessor update not available');
        return this.import();
    }

    async delete(): Promise<boolean> {
        console.log('Config File UserAccessor delete not available');
        return false;
    }

    async list(): Promise<User[]> {
        return [await this.import()];
    }
}