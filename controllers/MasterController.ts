import { BaseController } from './BaseController';
import { Master, IMasterEntity, IMasterAttr } from '../models/Master';
import { FindOptions } from 'sequelize';
import { Kabupaten } from '../models/Kabupaten';
import { Comodity } from '../models/Comodity';
import { DB } from '../common/DB';

export class MasterController extends BaseController<IMasterEntity, IMasterAttr> {
    constructor() {
        super(Master);
    }

    async getSupplyDemandNational(month, year=null) {
        if (!year)
            year = new Date().getFullYear();

        let query = 'select * from vw_supply_demand_national where month = :month and year = :year';
        let replacements = { month: month, year: year };
        let result = await DB.query(query, { replacements });

        return result[0];
    }
	
	async getSupplyDemandNationalByYear(year=null) {
        if (!year)
            year = new Date().getFullYear();

        let query = 'select * from vw_supply_demand_national_year where year = :year';
        let replacements = { year: year };
        let result = await DB.query(query, { replacements });

        return result[0];
    }
    
    async getSupplyDemandByProvince(provinceId, month, year=null) {
        if (!year)
            year = new Date().getFullYear();

        let query = 'select * from vw_supply_demand_province where province_id = :provinceId and month = :month and year = :year';
        let replacements = { provinceId: provinceId, month: month, year: year };
        let result = await DB.query(query, { replacements });

        return result[0];
    }
	
	async getSupplyDemandByProvinceByYear(provinceId, year=null) {
        if (!year)
            year = new Date().getFullYear();

        let query = 'select * from vw_supply_demand_province_year where province_id = :provinceId and year = :year';
        let replacements = { provinceId: provinceId, year: year };
        let result = await DB.query(query, { replacements });

        return result[0];
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