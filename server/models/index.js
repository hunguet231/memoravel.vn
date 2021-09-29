const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../configs/config.json")[env];

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

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.post = require("./post.model")(sequelize, Sequelize);
db.topic = require("./topic.model")(sequelize, Sequelize);

// Join user with post
db.user.hasOne(db.post);
db.post.belongsTo(db.user);
//Join post with topic
db.post.hasMany(db.topic);
db.topic.belongsTo(db.post);

module.exports = db;