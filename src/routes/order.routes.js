const Router = require('express');
const router = new Router();
const orderController = require('../controller/order.controller');

router.post('/order/create', orderController.createOrder);
router.post('/order/update-status', orderController.updateStatusOrder);
router.get('/order/list', orderController.getOrders);
router.get('/order/:orderId', orderController.getOrderSingle);
router.get('/order/list/:userId', orderController.getUserOrders);
module.exports = router;
