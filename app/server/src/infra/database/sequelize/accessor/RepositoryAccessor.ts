import { Repository } from '../../../../domain/database/params/repository';
import { RepositoryModel } from '../models';
import { Database } from '../../../../domain/database/database';

export class RepositoryAccessor extends Database<Repository> {
    async create(repository: Repository): Promise<Repository> {
        return (await RepositoryModel.create(repository)).dataValues;
    }

    async get(id: number): Promise<Repository> {
        const model = await RepositoryModel.findByPk(id);
        if (!model) {
            throw new Error('Repository not found');
        }
        return model.dataValues;
    }

    async update(repository: Repository): Promise<Repository> {
        const model = await RepositoryModel.findByPk(repository.id);
        if (!model) {
            throw new Error('Repository not found');
        }
        return (await model.update(repository)).dataValues;
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await RepositoryModel.destroy({ where: { id } });
        return !!deleted;
    }

    async list(): Promise<Repository[]> {
        return (await RepositoryModel.findAll()).map((model) => model.dataValues);
    }
}