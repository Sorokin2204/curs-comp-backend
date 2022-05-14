const Sequelize = require('sequelize');
const reset = require('../setup');
const setupRelationship = require('../setupRelationship');

const sequelize = new Sequelize('curs-comp', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// db.sequelize.drop();

//MODELS
db.users = require('./user.model')(sequelize, Sequelize);
db.brands = require('./brand.model')(sequelize, Sequelize);
db.categories = require('./category.model')(sequelize, Sequelize);
db.attributes = require('./attribute.model')(sequelize, Sequelize);
db.attributeTexts = require('./attributeText.model')(sequelize, Sequelize);
db.attributeCheckboxes = require('./attributeCheckbox.model')(sequelize, Sequelize);
db.attributeNumbers = require('./attributeNumber.model')(sequelize, Sequelize);
db.attributeSelects = require('./attributeSelect.model')(sequelize, Sequelize);
db.attributeOptions = require('./attributeOption.model')(sequelize, Sequelize);
db.products = require('./product.model')(sequelize, Sequelize);
db.orders = require('./order.model')(sequelize, Sequelize);
db.productOrders = require('./productOrder.model')(sequelize, Sequelize);
db.tokens = require('./token.model')(sequelize, Sequelize);

setupRelationship(db);

module.exports = db;
