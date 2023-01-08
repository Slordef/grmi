import { IRepository } from '../../../../domain/interface/IRepository';
import { Database } from '../../../../domain/core/Database';
import { FileManager } from '../FileManager';

export class RepositoryAccessor extends Database<IRepository> {

    async import(): Promise<IRepository[]> {
        const data = await FileManager.read<IRepository[]>('repositories.json');
        data.forEach((repo: IRepository) => {
            if (!IRepository.parse(repo)) {
                throw new Error('Repository not found');
            }
        });
        return data;
    }

    async create(): Promise<IRepository> {
        console.log('Config File RepositoryAccessor create not available');
        const list = await this.import();
        if (!list.length) {
            throw new Error('Repository not found');
        }
        return list[0];
    }

    async get(id: number): Promise<IRepository> {
        const list = await this.import();
        const data = list.find((repository) => repository.id === id);
        if (!data) {
            throw new Error('Repository not found');
        }
        return data;
    }

    async update(repository: IRepository): Promise<IRepository> {
        console.log('Config File RepositoryAccessor update not available');
        const list = await this.import();
        const data = list.find((d) => d.id === repository.id);
        if (!data) {
            throw new Error('Repository not found');
        }
        return data;
    }

    async delete(id: number): Promise<boolean> {
        console.log('Config File RepositoryAccessor delete not available');
        return false;
    }

    async list(): Promise<IRepository[]> {
        return this.import();
    }
}