import { BaseController } from './BaseController';
import { Comodity, IComodityEntity, IComodityAttr } from '../models/Comodity';
import { FindOptions } from 'sequelize';

export class ComodityController extends BaseController<IComodityEntity, IComodityAttr> {
    constructor() {
        super(Comodity);
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
    }
}