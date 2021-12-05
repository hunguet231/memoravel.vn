const Shop_ratings = (sequelize, Sequelize) => {
    const Shop_ratings = sequelize.define("shop_ratings", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      comment: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      view: Sequelize.INTEGER,
      star: Sequelize.STRING,
      status: Sequelize.INTEGER,
      details: Sequelize.TEXT,
    });
    return Shop_ratings;
  };
  
  export default Shop_ratings;
  