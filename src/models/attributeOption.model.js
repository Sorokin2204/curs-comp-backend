module.exports = (sequelize, Sequelize) => {
  const AttributeOption = sequelize.define('attributeOption', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return AttributeOption;
};
