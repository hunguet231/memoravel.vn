const Carts = (sequelize, Sequelize) => {
    const Carts = sequelize.define("carts", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      price: Sequelize.INTEGER, 
      quantity:Sequelize.INTEGER,
      discount: Sequelize.STRING,
      active: Sequelize.INTEGER,
      status: Sequelize.INTEGER,
      details: Sequelize.TEXT,
    });
    return Carts;
  };
  
  export default Carts;
  