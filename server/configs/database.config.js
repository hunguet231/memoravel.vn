import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configFile from "./config.json";
import { UserModel } from "../models";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const database = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

const Model = {
  user: UserModel(sequelize, Sequelize),
};

database.Model = Model;

export default database;
