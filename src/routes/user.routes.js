const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/user', userController.createUser);
module.exports = router;
