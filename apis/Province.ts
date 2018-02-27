import { Router } from "express";
import { Configurator } from '../common/Configurator';
import { Authenticator } from "../common/Authenticator";
import { ProvinceController } from "../controllers/ProvinceController";

const API_URL = Configurator.get('api');
const API_NAME = 'province';

let controller = new ProvinceController();
let router = Router();

router.get(API_URL + '/' + API_NAME + '/get', Authenticator, async (req, res) => {
    try {
        let result = await controller.get(req.query.id);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getAll', Authenticator, async (req, res) => {
    try {
        controller.applyQuery(JSON.parse(req.query.query));
        
        let result = await controller.getAll();

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getAllAndCount', Authenticator, async (req, res) => {
    try {
        controller.applyQuery(JSON.parse(req.query.query));
        
        let result = await controller.getAllAndCount();

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.post(API_URL + '/' + API_NAME + '/save', Authenticator, async (req, res) => {
    try {
        let result = await controller.save(req.body);
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.delete(API_URL + '/' + API_NAME + '/delete', Authenticator, async (req, res) => {
    try {
        let result = await controller.delete(req.query.id);
        res.status(200).send(req.query);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

export default router;