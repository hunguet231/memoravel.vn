import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import configFile from './config';
import {
  UserModel,
  TopicModel,
  PostModel,
  ProductModel,
  ProductRatingModel,
  ShopModel,
  ShopAddressModel,
  ShopRatingModel,
  OrderModel,
  OrderProductModel,
} from '../models';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
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
  productModel: ProductModel(sequelize, Sequelize),
  productRatingModel: ProductRatingModel(sequelize, Sequelize),
  shopModel: ShopModel(sequelize, Sequelize),
  shopAddressModel: ShopAddressModel(sequelize, Sequelize),
  shopRatingModel: ShopRatingModel(sequelize, Sequelize),
  orderModel: OrderModel(sequelize, Sequelize),
  orderProductModel: OrderProductModel(sequelize, Sequelize),
};

database.Model = Model;

// Join user with post
Model.userModel.hasOne(Model.postModel, { foreignKey: 'user_id' });
Model.postModel.belongsTo(Model.userModel, { foreignKey: 'user_id' });

//Join post with topic
Model.topicModel.belongsToMany(Model.postModel, {
  through: 'topic_post',
  foreignKey: 'topic_id',
  otherKey: 'post_id',
});
Model.postModel.belongsToMany(Model.topicModel, {
  through: 'topic_post',
  foreignKey: 'post_id',
  otherKey: 'topic_id',
});

//Join user with shops
Model.userModel.hasOne(Model.shopModel, { foreignKey: 'user_id' });
Model.shopModel.belongsTo(Model.userModel, { foreignKey: 'user_id' });

//Join shop with products
Model.shopModel.hasOne(Model.productModel, { foreignKey: 'shop_id' });
Model.productModel.belongsTo(Model.shopModel, { foreignKey: 'shop_id' });

// Join shop with shop_address
Model.shopModel.hasOne(Model.shopAddressModel, { foreignKey: 'shop_id' });
Model.shopAddressModel.belongsTo(Model.shopModel, { foreignKey: 'shop_id' });

// Join shop with rating shop
Model.shopModel.hasMany(Model.shopRatingModel, { foreignKey: 'shop_id' });
Model.shopRatingModel.belongsTo(Model.shopModel, { foreignKey: 'shop_id' });

// Join user with rating shop
Model.userModel.hasMany(Model.shopRatingModel, { foreignKey: 'user_id' });
Model.shopRatingModel.belongsTo(Model.userModel, { foreignKey: 'user_id' });

// Join product with rating product
Model.productModel.hasMany(Model.productRatingModel, {
  foreignKey: 'product_id',
});
Model.productRatingModel.belongsTo(Model.productModel, {
  foreignKey: 'product_id',
});

// Join user with rating product
Model.userModel.hasMany(Model.productRatingModel, {
  foreignKey: 'user_id',
});
Model.productRatingModel.belongsTo(Model.userModel, {
  foreignKey: 'user_id',
});

// join order with product
Model.orderModel.hasMany(Model.orderProductModel, {
  foreignKey: 'order_id',
});
Model.orderProductModel.belongsTo(Model.orderModel, {
  foreignKey: 'order_id',
});

Model.productModel.hasMany(Model.orderProductModel, {
  foreignKey: 'product_id',
});
Model.orderProductModel.belongsTo(Model.productModel, {
  foreignKey: 'product_id',
});

export default database;
