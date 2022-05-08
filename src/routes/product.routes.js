const Router = require('express');
const router = new Router();
const productController = require('../controller/product.controller');

router.post('/product/create', productController.createProduct);
router.post('/product/update', productController.updateProduct);
router.post('/product/delete', productController.deleteProduct);
module.exports = router;
