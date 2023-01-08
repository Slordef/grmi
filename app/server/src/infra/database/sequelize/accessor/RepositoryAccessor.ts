import { IRepository } from '../../../../domain/interface/IRepository';
import { RepositoryModel } from '../models';
import { Database } from '../../../../domain/core/Database';

export class RepositoryAccessor extends Database<IRepository> {
    async create(repository: IRepository): Promise<IRepository> {
        return (await RepositoryModel.create(repository)).dataValues;
    }

    async get(id: number): Promise<IRepository> {
        const model = await RepositoryModel.findByPk(id);
        if (!model) {
            throw new Error('Repository not found');
        }
        return model.dataValues;
    }

    async update(repository: IRepository): Promise<IRepository> {
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

    async list(): Promise<IRepository[]> {
        return (await RepositoryModel.findAll()).map((model) => model.dataValues);
    }
}