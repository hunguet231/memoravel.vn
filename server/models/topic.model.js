const Topics = (sequelize, Sequelize) => {
  const Topics = sequelize.define('topics', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    title: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    description: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    alias: Sequelize.TEXT + ' CHARSET utf8 COLLATE utf8_general_ci',
    status: Sequelize.INTEGER,
    details: Sequelize.TEXT,
  });
  return Topics;
};

export default Topics;
