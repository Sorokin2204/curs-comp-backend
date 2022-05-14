const Router = require('express');
const router = new Router();
const productController = require('../controller/product.controller');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/product/create', upload.single('image'), productController.createProduct);
router.post('/product/update', upload.single('image'), productController.updateProduct);
router.post('/product/delete', productController.deleteProduct);
router.get('/product/list', productController.getProducts);
router.get('/product/:productId', productController.getSingleProduct);
router.get('/product/search/:searchText', productController.searchProducts);

module.exports = router;
