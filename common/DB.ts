import { Configurator } from './Configurator';

import * as Sequelize from 'sequelize';

const HOST = Configurator.get('dbHost');
const PORT = Configurator.get('dbPort');
const DB_NAME = Configurator.get('dbName');
const DB_USER = Configurator.get('dbUser');
const DB_PASS = Configurator.get('dbPass');

const DB_OPTIONS: Sequelize.Options = {
    host: HOST,
    port: PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: { timeout: 1000000000 },
    operatorsAliases: true
};

export const DB = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_OPTIONS);