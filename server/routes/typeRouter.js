const {Router} = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create);
router.get('/',typeController.getAll);
router.get('/:id',typeController.getOne);
router.delete('/:id',checkRoleMiddleware("ADMIN"),typeController.deleteOne);

module.exports = router;

