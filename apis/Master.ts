import { Router } from "express";
import { Configurator } from '../common/Configurator';
import { Authenticator } from "../common/Authenticator";
import { MasterController } from "../controllers/MasterController";

const API_URL = Configurator.get('api');
const API_NAME = 'master';

let controller = new MasterController();
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

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandNational', Authenticator, async (req, res) => {
    try {
        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandNational(query.month, query.year);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandNationalByYear', Authenticator, async (req, res) => {
    try {
        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandNationalByYear(query.year);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandByProvince', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandByProvince(query.provinceId, query.month, query.year);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandByProvinceByYear', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandByProvinceByYear(query.provinceId, query.year);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandNationalByComodityByYear', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandNationalByComodityByYear(query.comodityId);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandNationalByComodityByMonth', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandNationalByComodityByMonth(query.comodityId);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandProvinceByComodityByMonth', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandProvinceByComodityByMonth(query.comodityId, query.provinceId);

        if (!result)
            return res.status(404).send({ status: 404, message: 'Result Not Found'});
        
        res.status(200).send(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
});

router.get(API_URL + '/' + API_NAME + '/getSupplyDemandProvinceByComodityByYear', Authenticator, async (req, res) => {
    try {

        let query = JSON.parse(req.query.query);

        let result = await controller.getSupplyDemandProvinceByComodityByYear(query.comodityId, query.provinceId);

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
        req.body['kabupatenId'] = req.body['kabupaten']['id'];
        req.body['comodityId'] = req.body['comodity']['id'];
   
        req.body['createdBy'] = req['identity']['id'];
        req.body['updatedBy'] = req['identity']['id'];

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