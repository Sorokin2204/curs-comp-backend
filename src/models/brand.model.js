module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define('brand', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return Brand;
};
