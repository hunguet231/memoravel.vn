const ProductRating = (sequelize, Sequelize) => {
  const ProductRating = sequelize.define('product_ratings', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    comment: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    star: Sequelize.STRING,
    images: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return ProductRating;
};

export default ProductRating;
