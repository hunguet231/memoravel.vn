const Products = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    title: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    summary: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    story: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    price: Sequelize.STRING,
    vectary_link: Sequelize.STRING,
    slug: Sequelize.STRING,
    in_stock: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return Products;
};

export default Products;
