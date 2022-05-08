module.exports = (sequelize, Sequelize) => {
  const ProductOrder = sequelize.define('productOrder', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return ProductOrder;
};
