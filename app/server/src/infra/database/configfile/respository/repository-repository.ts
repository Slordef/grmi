import { Repository } from '../../../../domain/database/params/repository';
import { Database } from '../../../../domain/database/database';
import { FileManager } from '../file-manager';

export class RepositoryRepository implements Database<Repository> {

    async import(): Promise<Repository[]> {
        const data = await FileManager.read<Repository[]>('repositories.json');
        data.forEach((repo: Repository) => {
            if (!Repository.parse(repo)) {
                throw new Error('Repository not found');
            }
        });
        return data;
    }

    async create(): Promise<Repository> {
        console.log('Config File RepositoryAccessor create not available');
        const list = await this.import();
        if (!list.length) {
            throw new Error('Repository not found');
        }
        return list[0];
    }

    async get(id: number): Promise<Repository> {
        const list = await this.import();
        const data = list.find((repository) => repository.id === id);
        if (!data) {
            throw new Error('Repository not found');
        }
        return data;
    }

    async update(repository: Repository): Promise<Repository> {
        console.log('Config File RepositoryAccessor update not available');
        const list = await this.import();
        const data = list.find((d) => d.id === repository.id);
        if (!data) {
            throw new Error('Repository not found');
        }
        return data;
    }

    async delete(): Promise<boolean> {
        console.log('Config File RepositoryAccessor delete not available');
        return false;
    }

    async list(): Promise<Repository[]> {
        return this.import();
    }
}