const setupRelationship = (db) => {
  // ONE CATEGORY -- MANY ATTRIBUTES
  db.categories.hasMany(db.attributes);
  db.attributes.belongsTo(db.categories);
  // ONE ATTRIBUTE  -- MANY ATTRIBUTE_OPTIONS
  db.attributes.hasMany(db.attributeOptions);
  db.attributeOptions.belongsTo(db.attributes);
  // ONE CATEGORY  -- MANY PRODUCTS
  db.categories.hasMany(db.products);
  db.products.belongsTo(db.categories);
  // ONE BRAND  -- MANY PRODUCTS
  db.brands.hasMany(db.products);
  db.products.belongsTo(db.brands);
  // ONE USER -- MANY ORDERS
  db.users.hasMany(db.orders);
  db.orders.belongsTo(db.users);
  // ONE BRAND -- MANY PRODUCTS
  db.brands.hasMany(db.products);
  db.products.belongsTo(db.brands);
  // MANY ATTRIBUTE_TEXTS  -- MANY PRODUCTS
  db.products.belongsToMany(db.attributes, { through: { model: db.attributeTexts, unique: false }, foreignKey: 'productId' });
  db.attributes.belongsToMany(db.products, { through: { model: db.attributeTexts, unique: false }, foreignKey: 'attributeId' });
  // MANY ATTRIBUTE_CHECKBOXES  -- MANY PRODUCTS
  db.products.belongsToMany(db.attributes, { through: { model: db.attributeCheckboxes, unique: false }, foreignKey: 'productId' });
  db.attributes.belongsToMany(db.products, { through: { model: db.attributeCheckboxes, unique: false }, foreignKey: 'attributeId' });
  // MANY ATTRIBUTE_NUMBERS  -- MANY PRODUCTS
  db.products.belongsToMany(db.attributes, { through: { model: db.attributeNumbers, unique: false }, foreignKey: 'productId' });
  db.attributes.belongsToMany(db.products, { through: { model: db.attributeNumbers, unique: false }, foreignKey: 'attributeId' });
  // MANY ATTRIBUTE_SELECT_PRODUCTS  -- MANY PRODUCTS
  db.products.belongsToMany(db.attributeOptions, { through: { model: db.attributeSelects, unique: false }, foreignKey: 'productId' });

  db.attributeOptions.belongsToMany(db.products, { through: { model: db.attributeSelects, unique: false }, foreignKey: 'optionId' });
  // MANY PRODUCTS  -- MANY ORDERS
  db.products.belongsToMany(db.orders, { through: { model: db.productOrders, unique: false }, foreignKey: 'productId' });
  db.orders.belongsToMany(db.products, { through: { model: db.productOrders, unique: false }, foreignKey: 'orderId' });
};

module.exports = setupRelationship;
