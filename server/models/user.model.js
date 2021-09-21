const Users = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    uid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    password: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
  });
  return Users;
};

export default Users;
