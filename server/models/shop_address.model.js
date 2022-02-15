const ShopAddress = (sequelize, Sequelize) => {
  const ShopAddress = sequelize.define('shop_address', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    country: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    city: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    district: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    ward: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    address_details: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return ShopAddress;
};

export default ShopAddress;
