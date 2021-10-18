import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configFile from "./config.json";
import { UserModel, TopicModel, PostModel, ShopModel, ProductModel, Shop_addressModel, CartModel } from "../models";

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
  shopModel: ShopModel(sequelize, Sequelize),
  productModel: ProductModel(sequelize, Sequelize),
  shop_addressModel: Shop_addressModel(sequelize, Sequelize),
  cartModel: CartModel(sequelize, Sequelize),

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

//Join user with shops
Model.userModel.hasOne(Model.shopModel, { foreignKey: "user_id" });
Model.shopModel.belongsTo(Model.userModel, { foreignKey: "user_id" });

//Join shop with products
Model.shopModel.hasOne(Model.productModel, { foreignKey: "shop_id" });
Model.productModel.belongsTo(Model.shopModel, { foreignKey: "shop_id" });

// Join shop with shop_address
Model.shopModel.hasOne(Model.shop_addressModel, { foreignKey: "shop_id" });
Model.shop_addressModel.belongsTo(Model.shopModel, { foreignKey: "shop_id" });

//Join user with carts
Model.userModel.hasOne(Model.cartModel, { foreignKey: "user_id" });
Model.cartModel.belongsTo(Model.userModel, { foreignKey: "user_id" });

//Join products with carts
Model.productModel.hasOne(Model.cartModel, { foreignKey: "product_id" });
Model.cartModel.belongsTo(Model.productModel, { foreignKey: "product_id" });

export default database;

