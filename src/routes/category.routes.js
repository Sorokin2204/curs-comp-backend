const Router = require('express');
const router = new Router();
const categoryController = require('../controller/category.controller');

router.post('/category/create', categoryController.createCategory);
router.post('/category/update', categoryController.updateCategory);
router.post('/category/delete', categoryController.deleteCategory);
router.get('/category/list', categoryController.getCategories);
module.exports = router;
