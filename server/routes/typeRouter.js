const { Router } = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', checkRoleMiddleware("ADMIN"), typeController.create);
router.get('/', typeController.getAll);
router.get('/:id', typeController.getOne);
router.delete('/:id', checkRoleMiddleware("ADMIN"), typeController.deleteOne);
router.put('/:id', checkRoleMiddleware("ADMIN"), typeController.changeOne);

module.exports = router;

