module.exports = (sequelize, Sequelize) => {
  const AttributeNumber = sequelize.define('attributeNumber', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
    },
  });
  return AttributeNumber;
};
