module.exports = (sequelize, Sequelize) => {
  const AttributeSelect = sequelize.define('attributeSelect', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  return AttributeSelect;
};
