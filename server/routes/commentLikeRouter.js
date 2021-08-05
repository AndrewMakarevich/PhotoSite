const Router = require('express');
const router = new Router();
const commentLikeController = require('../controllers/commentLikeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware, commentLikeController.create);
router.get('/',commentLikeController.getAll);
router.get('/:id',commentLikeController.getOne);
router.delete('/', authMiddleware, commentLikeController.deleteOne);


module.exports = router;