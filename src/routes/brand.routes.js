const Router = require('express');
const router = new Router();
const brandController = require('../controller/brand.controller');

router.post('/brand/create', brandController.createBrand);
router.post('/brand/update', brandController.updateBrand);
router.post('/brand/delete', brandController.deleteBrand);
router.get('/brand/list', brandController.getBrands);
module.exports = router;
