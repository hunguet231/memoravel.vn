const Posts = (sequelize, Sequelize) => {
  const Posts = sequelize.define('posts', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    title: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    description: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    content: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    alias: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    number_view: Sequelize.INTEGER,
    background: Sequelize.STRING,
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return Posts;
};

export default Posts;
