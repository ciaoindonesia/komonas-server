import { BaseController } from './BaseController';
import { User, IUserEntity, IUserAttr } from '../models/User';
import { FindOptions } from 'sequelize';
import { createHmac } from "crypto";

const uuid = require('node-uuid');

export class UserController extends BaseController<IUserEntity, IUserAttr> {
    constructor() {
        super(User);
    }

    async save(data) {
        try {
            let entity = null;

            if (data['password']) {
                let salt = uuid.v4();
                let userHash = createHmac('sha256', salt).update(data['password']).digest('hex');

                data.salt = salt;
                data.hash = userHash;
            }

            if(!data['id']) {
                data['createdDate'] ?  data['createdDate'] = new Date() : null;
                entity = await this.entity.create(data);
                
            } 
            else {
                data['modifiedDate'] ?  data['modifiedDate'] = new Date() : null;
                entity = await this.entity.update(data, { where: { id: data['id'] } });
            }

            return entity;
        }
        catch(exception) {
            throw new Error(exception);
        }
    }

    applyQuery(query: any) {
        this.query = { where: {}, include: [], order: [] };

        if(query.limit > 0) {
            this.query['offset'] = query.offset;
            this.query['limit'] = query.limit;
        }

        if(query.order) {
            let orders: any[] = [];

            query.order.forEach(order => {
                orders.push([order.field, order.order]);
            });

            this.query.order = orders;
        }

         if(!query.criteria)
            return;

         if (query.criteria.name)
            this.query.where['name'] = { $ilike: '%' + query.criteria.name + '%' };

         if (query.criteria.userName)
            this.query.where['userName'] = { $ilike: '%' + query.criteria.userName + '%' };
    }
}