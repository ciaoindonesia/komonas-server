import { BaseController } from './BaseController';
import { Kabupaten, IKabupatenEntity, IKabupatenAttr } from '../models/Kabupaten';
import { FindOptions } from 'sequelize';
import { Province } from '../models/Province';

export class KabupatenController extends BaseController<IKabupatenEntity, IKabupatenAttr> {
    constructor() {
        super(Kabupaten);
    }

    applyQuery(query: any) {
        this.query = { where: {}, include: [{model: Province, as: 'province'}], order: [] };

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

         if (query.criteria.province)
            this.query.where['provinceId'] = query.criteria.province.id;
    }
}