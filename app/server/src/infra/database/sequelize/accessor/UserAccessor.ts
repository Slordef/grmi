import { UserModel } from '../models';
import { User } from '../../../../domain/database/params/user';
import { Database } from '../../../../domain/database/database';

export class UserAccessor extends Database<User> {
    async create(user: User): Promise<User> {
        const model = await UserModel.create(user);
        return model.dataValues;
    }

    async get(id: number): Promise<User> {
        const model = await UserModel.findByPk(id);
        if (!model) {
            throw new Error('User not found');
        }
        return model.dataValues;
    }

    async update(user: User): Promise<User> {
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

    async list(): Promise<User[]> {
        return (await UserModel.findAll()).map((model) => model.dataValues);
    }
}