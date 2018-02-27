import { BIGINT, STRING, Instance } from 'sequelize';
import { DB } from '../common/DB';

export interface IProvinceAttr {
    id?: number;
    name: string;
}

export interface IProvinceEntity extends Instance<IProvinceAttr> {
    data: IProvinceAttr;
} 

export const Province = DB.define<IProvinceEntity, IProvinceAttr>('province', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false }
}, { timestamps: false, tableName: 'provinces', freezeTableName: true });