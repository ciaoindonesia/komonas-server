import { Router } from "express";
import { Configurator } from '../common/Configurator';
import { Authenticator } from "../common/Authenticator";
import { AuthController } from "../controllers/AuthController";

const API_URL = Configurator.get('api');
const API_NAME = 'auth';

let controller = new AuthController();
let router = Router();

router.post(API_URL + '/' + API_NAME + '/login', async (req, res) => {
    try {
        let result = await controller.login(req.body.userName, req.body.password);
        
        if (result['code'])
            return res.status(result['code']).send(result);

        return res.status(200).send({ identity: result });
    }
    catch(error) {
        return res.status(500).send(error);
    }
});

router.get(API_URL + '/' + API_NAME + '/getAuth', Authenticator, async(req, res) => {
    return res.status(200).send(req['identity']);
});

router.get(API_URL + '/' + API_NAME + '/logout', Authenticator, async(req, res) => {
    try {
        let token = req['identity']['token'];
        let result = await controller.logout(token);
        res.status(200).send({result: 'ok'});
    }
    catch(error) {
        res.status(500).send(error);
    }
});

export default router;