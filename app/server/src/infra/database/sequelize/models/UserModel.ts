import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection';
import { User } from '../../../../domain/database/params/user';
import { RepositoryModel } from './RepositoryModel';

export class UserModel extends Model<User> {
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER, primaryKey: true,
    }, name: {
        type: DataTypes.STRING,
    }, login: {
        type: DataTypes.STRING,
    }, email: {
        type: DataTypes.STRING,
    }
}, {
    sequelize, modelName: 'User',
});

UserModel.hasMany(RepositoryModel, {
    foreignKey: 'userId',
});
RepositoryModel.belongsTo(UserModel, {
    foreignKey: 'userId',
});