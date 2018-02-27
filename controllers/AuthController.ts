import { BaseController } from "./BaseController";
import { IAuthEntity, IAuthAttr, Auth } from "../models/Auth";
import { User } from "../models/User";
import { createHmac } from "crypto";

const TOKEN = require('rand-token');

export class AuthController extends BaseController<IAuthEntity, IAuthAttr> {
    constructor() {
        super(Auth);
    }

    async login(userName: string, password: string, agent?: string) {
        let user = await User.findOne({ 
            where:{ userName: userName }, include: [] 
        });

        if(!user)
            return {code: 401, message: 'User tidak ditemukan'};

        let hash = user.getDataValue('hash');
        let salt = user.getDataValue('salt');
        let userHash = createHmac('sha256', salt).update(password).digest('hex');

        if(hash !== userHash)
            return {code: 401, message: 'Password tidak ditemukan'};

        let token = TOKEN.generate(16);

        await Auth.create({ 
            userId: user.getDataValue('id'), 
            token: token, 
            agent: agent, 
            loginDate: new Date(),
            active: true
        });

        return {
            id: user.getDataValue('id'),
            name: user.getDataValue('name'),
            token: token
        }
    }

    async getAuthByToken(token: string) {
        let auth = await Auth.findOne({ 
            where: { token: token, active: true}, 
            include: [{ model: User, as: 'user', include: []}] 
        });

        if(!auth)
            return {code: 401, message: 'Auth tidak ditemukan'};

        return {
            id: auth.getDataValue('user').getDataValue('id'),
            name: auth.getDataValue('user').getDataValue('name'),
            token: auth.getDataValue('token')
        }
    }

    async logout(token: string) {
        let auth = await Auth.findOne({ where: { token: token, active: true} });
        return await auth.update({active: false});
    }
}