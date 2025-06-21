const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/profile', authMiddleware, userController.getProfile);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router; 