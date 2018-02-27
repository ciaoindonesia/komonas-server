import { BIGINT, STRING, BOOLEAN, DATE, Instance } from 'sequelize';
import { User } from './User';
import { DB } from '../common/DB';

export interface IAuthAttr {
    id?: number;
    userId?: number;
    loginDate: Date;
    agent: string;
    token: string;
    active?: boolean
}

export interface IAuthEntity extends Instance<IAuthAttr> {
    data: IAuthAttr;
}

export let Auth = DB.define<IAuthEntity, IAuthAttr>('auth', {
   id: { type: BIGINT, primaryKey: true, autoIncrement: true },
   userId: { type: BIGINT, allowNull: false, field: 'user_id' },
   agent: { type: STRING, allowNull: true },
   token: { type: STRING, allowNull: false },
   loginDate: { type: DATE, allowNull: false, defaultValue: new Date(), field: 'login_date' },
   active: { type: BOOLEAN, allowNull: false, defaultValue: false }
}, { timestamps: false, tableName: 'auths', freezeTableName: true });

Auth.belongsTo(User, { as: 'user', foreignKey: 'userId'});