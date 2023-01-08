import { Database } from '../../../../domain/core/Database';
import { IUser } from '../../../../domain/interface/IUser';
import { FileManager } from '../FileManager';

export class UserAccessor extends Database<IUser> {

    async import(): Promise<IUser> {
        const data = await FileManager.read<IUser>('user.json');
        if (IUser.parse(data)) return data;
        throw new Error('User not found');
    }

    async create(): Promise<IUser> {
        console.log('Config File UserAccessor create not available');
        return this.import();
    }

    async get(): Promise<IUser> {
        return this.import();
    }

    async update(): Promise<IUser> {
        console.log('Config File UserAccessor update not available');
        return this.import();
    }

    async delete(): Promise<boolean> {
        console.log('Config File UserAccessor delete not available');
        return false;
    }

    async list(): Promise<IUser[]> {
        return [await this.import()];
    }
}