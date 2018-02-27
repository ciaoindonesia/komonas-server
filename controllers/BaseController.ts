import { Model, FindOptions } from 'sequelize';

export class BaseController<I, A> {
    protected query: any;
    protected entity: Model<I, A>;
    
    constructor(entity) {
        this.entity = entity;
    }

    async get(id: number) {
        try {
            return await this.entity.findById(id, this.query);
        } 
        catch(exception) {
            throw new Error(exception);
        }
    }

    async getAll() {
        try {
            return await this.entity.findAll(this.query);
        }
        catch(exception) {
            throw new Error(exception);
        }
    }

    async getAllAndCount() {
        try {
            return await this.entity.findAndCount(this.query);
        }
        catch(exception) {
            throw new Error(exception);
        }
    }

    async save(data: A) {
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

    async delete(id: number) {
        try {
           let deleted = await this.entity.destroy({ where: { id: id }});
           return { deleted: deleted };
        }
        catch(exception) {
            throw new Error(exception);
        }
    }

    applyQuery(query: any): void {
        return;
    }
}