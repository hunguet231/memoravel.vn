const Carts = (sequelize, Sequelize) => {
    const Carts = sequelize.define("carts", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      quantity:Sequelize.INTEGER,
      status: Sequelize.INTEGER,
      details: Sequelize.TEXT,
    });
    return Carts;
  };
  
  export default Carts;
  