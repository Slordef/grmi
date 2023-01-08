import { Database } from './Database';
import { IUser } from '../interface/IUser';
import { IRepository } from '../interface/IRepository';
import { IFetchRequest, IFetchResponse } from '../interface/IFetch';

export abstract class Adapter {
    public abstract fetch(url: string, options?: IFetchRequest): Promise<IFetchResponse>;

    public abstract databaseUser(): Database<IUser>;

    public abstract databaseRepository(): Database<IRepository>;
}

