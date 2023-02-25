"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const types_1 = require("../types");
const config_1 = __importDefault(require("./config"));
const pkg = require("../../../package.json");
exports.default = ((isProductionEnv) => isProductionEnv
    ? new sequelize_1.Sequelize({
        database: config_1.default.database.name,
        username: config_1.default.database.username,
        password: config_1.default.database.password,
        host: `/cloudsql/nomadic-oarlock-375121:us-central1:webscrapper-database`,
        // host: config.database.host,
        // port: config.database.port,
        dialect: "postgres",
        dialectOptions: {
            socketPath: `/cloudsql/nomadic-oarlock-375121:us-central1:webscrapper-database`,
            // ssl: {
            //   require: true,
            //   rejectUnauthorized: false,
            // },
        },
    })
    : new sequelize_1.Sequelize(`postgres://localhost:5432/${pkg.name}`, {
        logging: false,
    }))(process.env.NODE_ENV === types_1.Environment.PRODUCTION);
//     export default ((isProductionEnv: boolean) =>
// isProductionEnv
//   ? new Sequelize({
//       database: config.database.name,
//       username: config.database.username,
//       password: config.database.password,
//       host: `/cloudsql/nomadic-oarlock-375121:us-central1:webscrapper-database`,
//       // host: config.database.host,
//       // port: config.database.port,
//       dialect: "postgres",
//       dialectOptions: {
//         socketPath: `/cloudsql/nomadic-oarlock-375121:us-central1:webscrapper-database`,
//         // ssl: {
//         //   require: true,
//         //   rejectUnauthorized: false,
//         // },
//       },
//     })
//   : new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
//       logging: false,
//     }))(process.env.NODE_ENV === Environment.PRODUCTION);
