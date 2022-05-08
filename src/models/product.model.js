module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: Sequelize.STRING,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Product;
};
