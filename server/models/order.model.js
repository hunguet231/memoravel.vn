const Orders = (sequelize, Sequelize) => {
  const Orders = sequelize.define('orders', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    full_name: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    country: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    city: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    district: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    address_details: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    totalPaid: Sequelize.STRING,
    active: Sequelize.INT,
    shipping: Sequelize.STRING,
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return Orders;
};

export default Orders;
