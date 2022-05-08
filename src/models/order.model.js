module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    number: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'waiting',
      validate: {
        isIn: [['canceled', 'completed', 'waiting']],
      },
    },
  });
  return Order;
};
