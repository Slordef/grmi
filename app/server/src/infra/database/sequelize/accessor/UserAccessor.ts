import { UserModel } from '../models';
import { IUser } from '../../../../domain/interface/IUser';
import { Database } from '../../../../domain/core/Database';

export class UserAccessor extends Database<IUser> {
    async create(user: IUser): Promise<IUser> {
        const model = await UserModel.create(user);
        return model.dataValues;
    }

    async get(id: number): Promise<IUser> {
        const model = await UserModel.findByPk(id);
        if (!model) {
            throw new Error('User not found');
        }
        return model.dataValues;
    }

    async update(user: IUser): Promise<IUser> {
        const model = await UserModel.findByPk(user.id);
        if (!model) {
            throw new Error('User not found');
        }
        return (await model.update(user)).dataValues;
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await UserModel.destroy({ where: { id } });
        return !!deleted;
    }

    async list(): Promise<IUser[]> {
        return (await UserModel.findAll()).map((model) => model.dataValues);
    }
}