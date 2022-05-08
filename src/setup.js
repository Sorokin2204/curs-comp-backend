function reset(db) {
  db.brands.bulkCreate([{ name: 'ASUS' }, { name: 'MSI' }]);
  db.users.bulkCreate([{ fullName: 'Личко Евгений Олегович', login: 'lichko123', password: 'pass', type: 'admin' }]);
  db.products.bulkCreate([{ name: 'Gefore' }]);
  db.attributeOptions.bulkCreate([{ name: 'ОПция' }]);
  db.attributes.bulkCreate([{ name: 'Разъем', type: 'text' }]);
  db.categories.bulkCreate([{ name: 'Видеокарты' }, { name: 'Оперативная память' }]);
}

module.exports = reset;
