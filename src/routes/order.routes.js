const Router = require('express');
const router = new Router();
const orderController = require('../controller/order.controller');

router.post('/order/create', orderController.createOrder);
router.post('/order/update-status', orderController.changeStatusOrder);
module.exports = router;
