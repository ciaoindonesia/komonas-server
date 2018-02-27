import { BIGINT, STRING, Instance } from 'sequelize';
import { DB } from '../common/DB';
import { Province } from './Province';

export interface IKabupatenAttr {
    id?: number;
    name: string;
    provinceId: number;
}

export interface IKabupatenEntity extends Instance<IKabupatenAttr> {
    data: IKabupatenAttr;
} 

export const Kabupaten = DB.define<IKabupatenEntity, IKabupatenAttr>('kabupaten', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    provinceId: { type: BIGINT, allowNull: false, field: 'province_id' }
}, { timestamps: false, tableName: 'kabupatens', freezeTableName: true });

Kabupaten.belongsTo(Province, {as: 'province', foreignKey: 'provinceId'});