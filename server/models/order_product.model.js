const OrderProducts = (sequelize, Sequelize) => {
  const OrderProducts = sequelize.define('order_products', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    quantity: Sequelize.INTEGER,
    note: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    details: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
  });
  return OrderProducts;
};

export default OrderProducts;
