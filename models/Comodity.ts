import { BIGINT, STRING, Instance } from 'sequelize';
import { DB } from '../common/DB';

export interface IComodityAttr {
    id?: number;
    name: string;
    imagePath?: string;
}

export interface IComodityEntity extends Instance<IComodityAttr> {
    data: IComodityAttr;
} 

export const Comodity = DB.define<IComodityEntity, IComodityAttr>('comodity', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    imagePath: { type: STRING, allowNull: true, field: 'image_path' }
}, { timestamps: false, tableName: 'comodities', freezeTableName: true });