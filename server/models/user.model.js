const Users = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    username: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    password: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    full_name: Sequelize.TEXT + " CHARSET utf8 COLLATE utf8_general_ci",
    gender: Sequelize.INTERGER,
    date_of_birth: Sequelize.DATE,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    avatar: Sequelize.STRING,
    role: Sequelize.ENUM("Admin", "Author"),
    status: Sequelize.BOOLEAN,
    details: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    modified_at: Sequelize.DATE,
  });
  return Users;
};

export default Users;
