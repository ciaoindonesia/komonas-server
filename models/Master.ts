import { BIGINT, STRING, Instance, DATEONLY, INTEGER, DATE } from 'sequelize';
import { DB } from '../common/DB';
import { Kabupaten } from './Kabupaten';
import { Comodity } from './Comodity';

export interface IMasterAttr {
    id?: number;
    kabupatenId: number;
    comodityId: number;
    status?: string;
    supply?: number;
    demand?: number;
    date: Date;
    createdDate?: Date;
    createdBy?: number;
    updatedDate?: Date;
    updatedBy?: number;
}

export interface IMasterEntity extends Instance<IMasterAttr> {
    data: IMasterAttr;
} 

export const Master = DB.define<IMasterEntity, IMasterAttr>('master', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    kabupatenId: { type: BIGINT, allowNull: false , field: 'kabupaten_id'},
    comodityId: { type: BIGINT, allowNull: false , field: 'comodity_id'},
    supply: { type: INTEGER, allowNull: false, defaultValue: 0 },
    demand: { type: INTEGER, allowNull: false, defaultValue: 0 },
    status: { type: STRING, allowNull: false, defaultValue: 'normal' },
    date: { type: DATEONLY, allowNull: false },
    createdBy: { type: BIGINT, allowNull: true, field: 'created_by' },
    createdDate: { type: DATE, allowNull: true, field: 'created_date' },
    updatedBy: { type: BIGINT, allowNull: true, field: 'updated_by' },
    updatedDate: { type: DATE, allowNull: true, field: 'updated_date' }
}, { timestamps: false, tableName: 'masters', freezeTableName: true });

Master.belongsTo(Kabupaten, {as: 'kabupaten', foreignKey: 'kabupatenId'});
Master.belongsTo(Comodity, {as: 'comodity', foreignKey: 'comodityId'});