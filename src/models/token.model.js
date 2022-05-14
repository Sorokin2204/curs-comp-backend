module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define('token', {
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Token;
};
