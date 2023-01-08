import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connection';
import { IUser } from '../../../../domain/interface/IUser';

export class UserModel extends Model<IUser> {
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    login: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'User',
});