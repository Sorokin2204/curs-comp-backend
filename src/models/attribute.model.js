module.exports = (sequelize, Sequelize) => {
  const Attribute = sequelize.define('attribute', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['select', 'text', 'number', 'checkbox']],
      },
    },
  });
  return Attribute;
};
