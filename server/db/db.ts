import { Sequelize } from "sequelize";
import { Environment } from "../types";
import config from "./config";
const pkg = require("../../../package.json");

export default ((isProductionEnv: boolean) =>
  isProductionEnv
    ? new Sequelize({
        database: config.database.name,
        username: config.database.username,
        password: config.database.password,
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
    : new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
        logging: false,
      }))(process.env.NODE_ENV === Environment.PRODUCTION);

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
