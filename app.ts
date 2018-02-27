import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';

import { Configurator } from './common/Configurator';

const TOKEN = require('rand-token');
const PORT = Configurator.get('port');

let app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Accept, X-Token');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/tmp', express.static(path.join(__dirname, 'public/tmp')));

app.get('/', (req, res) => {
    res.send('Komonas Server Is Active!');
});

app.use(cookieParser(TOKEN.generate(16)));
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let files = fs.readdirSync('./apis');

files.forEach(file => {
    let segmented = file.split('.');
    let extension = segmented[segmented.length - 1];
   
    if (extension === 'js') {
        console.log(segmented[0] + ' api is ready!');
        app.use(require('./apis/' + segmented[0]).default);
    }
});

app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    else
        console.log('Komonas Server is running on port %s', PORT);
});