import { Sequelize } from "sequelize";
import { Config } from "../config/index.js";


const db = new Sequelize(Config.database, Config.username, Config.password, {
  host: Config.host,
  dialect: "mysql",
});

export default db;


