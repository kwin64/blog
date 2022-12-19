const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/user-controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
import { registrationValidator } from '../validation/auth';

router.post('/registration', registrationValidator, userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logOut);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
