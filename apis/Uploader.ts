import { Router } from "express";
import { Configurator } from '../common/Configurator';
import { Authenticator } from "../common/Authenticator";

import * as multer from 'multer';

const API_URL = Configurator.get('api');
const API_NAME = 'uploader';
const PATH = Configurator.get('tmpPath');

let router = Router();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/tmp/')
    },
    filename: function (req, file, cb) {
      let extensions = file.originalname.split('.');
      let fileName = file.fieldname + '-' + Date.now() + '.' + extensions[extensions.length -1];

      req['fileName'] = fileName
      cb(null, fileName);
    }
});
let upload = multer({ storage: storage });


router.post(API_URL + '/' + API_NAME + '/upload', [Authenticator, upload.single('file')], async(req, res) => {
    return res.status(200).send(PATH + req['fileName']);
});

export default router;