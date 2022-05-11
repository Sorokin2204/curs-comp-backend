const Router = require('express');
const router = new Router();
const attributeController = require('../controller/attribute.controller');

router.post('/attribute/create', attributeController.createAttribute);
router.post('/attribute/update', attributeController.updateAttribute);
router.get('/attribute/:categoryId', attributeController.getCategoryAttributes);
router.get('/attribute', attributeController.getProductAttributes);
module.exports = router;
