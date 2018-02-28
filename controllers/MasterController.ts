import { BaseController } from './BaseController';
import { Master, IMasterEntity, IMasterAttr } from '../models/Master';
import { FindOptions } from 'sequelize';
import { Kabupaten } from '../models/Kabupaten';
import { Comodity } from '../models/Comodity';

export class MasterController extends BaseController<IMasterEntity, IMasterAttr> {
    constructor() {
        super(Master);
    }

    async save(data) {
        try {
            let entity = null;

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
        this.query = { where: {}, include: [{model: Kabupaten, as: 'kabupaten'}, {model: Comodity, as: 'comodity'}], order: [] };

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

         if (query.criteria.status)
            this.query.where['status'] = query.criteria.status;

         if (query.criteria.kabupaten)
            this.query.where['kabupatenId'] = query.criteria.kabupaten.id;

         if (query.criteria.comodity)
            this.query.where['comodityId'] = query.criteria.comodity.id;

         if (query.criteria.from && query.criteria.to) {
                let fromDate = new Date(query.criteria.from);
                let toDate = new Date(query.criteria.to);
                let from = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), 0, 0, 0);
                let to = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 24, 0, 0);
                this.query.where['date'] = { $between: [from, to] };
        }
    }
}