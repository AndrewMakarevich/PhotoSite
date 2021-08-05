const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, commentController.create);
router.get('/',commentController.getAll);
router.get('/:id', commentController.getOne);
router.delete('/', authMiddleware, commentController.deleteAll);
router.delete('/:id', authMiddleware, commentController.deleteOne);


module.exports = router;