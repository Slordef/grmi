import { DataTypes, Model } from 'sequelize';
import { IRepository } from '../../../../domain/interface/IRepository';
import { sequelize } from '../connection';

export class RepositoryModel extends Model<IRepository> {
    public pk!: number;
}

RepositoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    owner: {
        type: DataTypes.STRING,
    },
    html_url: {
        type: DataTypes.STRING,
    },
    secret: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'Repository',
});