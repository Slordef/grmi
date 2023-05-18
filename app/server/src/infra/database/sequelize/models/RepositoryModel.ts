import { DataTypes, Model } from 'sequelize';
import { Repository } from '../../../../domain/database/params/repository';
import { sequelize } from '../connection';

export class RepositoryModel extends Model<Repository> {
    public pk!: number;
}

RepositoryModel.init({
    id: {
        type: DataTypes.INTEGER, primaryKey: true,
    }, name: {
        type: DataTypes.STRING,
    }, owner: {
        type: DataTypes.STRING,
    }, html_url: {
        type: DataTypes.STRING,
    }, secret: {
        type: DataTypes.STRING,
    }, userId: {
        type: DataTypes.INTEGER,
    }, labels: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
}, {
    sequelize, modelName: 'Repository',
});