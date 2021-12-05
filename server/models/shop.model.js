const Shops = (sequelize, Sequelize) => {
    const Shops = sequelize.define("shops", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      avatar: Sequelize.STRING,
      description: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
      status: Sequelize.INTEGER,
      details: Sequelize.TEXT,
    });
    return Shops;
  };
  
  export default Shops;
  