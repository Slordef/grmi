/* eslint-disable @typescript-eslint/no-unused-vars */
import { Database } from '../../src/domain/database/database';

export class TestRepository<T> implements Database<T> {
    constructor(
		private readonly mock: () => T = () => ({} as T)
    ) {
    }

    repository: () => T = () => {
        return this.mock();
    };

    async create(value: T): Promise<T> {
        const repository = this.repository();
        return Promise.resolve(repository);
    }

    async delete(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    async get(id: number): Promise<T> {
        const repository = this.repository();
        return Promise.resolve(repository);
    }

    async list(): Promise<T[]> {
        const repository = this.repository();
        return Promise.resolve([repository]);
    }

    async update(value: T): Promise<T> {
        const repository = this.repository();
        return Promise.resolve(repository);
    }
}