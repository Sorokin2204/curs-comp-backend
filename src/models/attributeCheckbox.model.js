module.exports = (sequelize, Sequelize) => {
  const AttributeCheckbox = sequelize.define('attributeCheckbox', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
  return AttributeCheckbox;
};
