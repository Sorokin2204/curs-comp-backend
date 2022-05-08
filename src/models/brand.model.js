module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define('brand', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });
  return Brand;
};
