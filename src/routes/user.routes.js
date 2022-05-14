const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/user/register', userController.registerUser);
router.get('/user/check-auth', userController.checkAuth);
router.post('/user/login', userController.loginUser);
// router.post('/user/login', userController.loginUser);
// router.post('/user/logout', userController.logoutUser);
// router.get('/refresh', userController.refreshUser);
module.exports = router;
