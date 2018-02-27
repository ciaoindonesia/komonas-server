import { BIGINT, STRING, Instance } from 'sequelize';
import { DB } from '../common/DB';

export interface IUserAttr {
    id?: number;
    name: string;
    userName: string;
    hash: string;salt: string;
}

export interface IUserEntity extends Instance<IUserAttr> {
    data: IUserAttr;
} 

export const User = DB.define<IUserEntity, IUserAttr>('user', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: STRING, allowNull: false },
    userName: { type: STRING, allowNull: false, field: 'user_name' },
    hash: { type: STRING, allowNull: false },
    salt: { type: STRING, allowNull: false }
}, { timestamps: false, tableName: 'users', freezeTableName: true });