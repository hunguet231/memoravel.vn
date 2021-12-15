const Products = (sequelize, Sequelize) => {
  const Products = sequelize.define('products', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    summary: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    description: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    story: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    images: Sequelize.TEXT,
    alias: Sequelize.STRING,
    price: Sequelize.STRING,
    type: Sequelize.STRING,
    made_in: Sequelize.STRING,
    vectary_link: Sequelize.STRING,
    sold: Sequelize.INTEGER,
    in_stock: Sequelize.INTEGER,
    total_star: Sequelize.FLOAT,
    total_amount: Sequelize.INTEGER,
    number_view: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return Products;
};

export default Products;
