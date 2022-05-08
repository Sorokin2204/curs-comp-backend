module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    type: {
      type: Sequelize.STRING,
      validate: {
        isIn: [['admin', 'client']],
      },
    },
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
