import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configFile from "./config.json";
import { UserModel, TopicModel, PostModel } from "../models";

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
  userModel: UserModel(sequelize, Sequelize),
  topicModel: TopicModel(sequelize, Sequelize),
  postModel: PostModel(sequelize, Sequelize),
};

database.Model = Model;

// Join user with post
Model.userModel.hasOne(Model.postModel, { foreignKey: "user_id" });
Model.postModel.belongsTo(Model.userModel, { foreignKey: "user_id" });

//Join post with topic
Model.topicModel.belongsToMany(Model.postModel, {
  through: "topic_post",
  foreignKey: "topic_id",
  otherKey: "post_id",
});
Model.postModel.belongsToMany(Model.topicModel, {
  through: "topic_post",
  foreignKey: "post_id",
  otherKey: "topic_id",
});

export default database;
