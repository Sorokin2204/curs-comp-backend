module.exports = (sequelize, Sequelize) => {
  const AttributeText = sequelize.define('attributeText', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return AttributeText;
};
