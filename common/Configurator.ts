const ENV = require("../env.json");

export class Configurator {
    static get(key) {
        let config = ENV[process.env.NODE_ENV || "development"];
        return config[key];
    }
}