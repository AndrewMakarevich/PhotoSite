const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:8}),
    userController.registration);

router.post('/login',userController.login);
router.get('/activate/:link',userController.activate);
router.get('/auth', authMiddleware, userController.check);


module.exports = router;