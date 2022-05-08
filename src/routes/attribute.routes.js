const Router = require('express');
const router = new Router();
const attributeController = require('../controller/attribute.controller');

router.post('/attribute/create', attributeController.createAttribute);
router.post('/attribute/update', attributeController.updateAttribute);
module.exports = router;
