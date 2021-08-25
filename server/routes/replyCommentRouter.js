const Router = require('express');
const router = new Router();
const ReplyCommentController = require('../controllers/replyCommentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ReplyCommentController.create);
router.get('/:id', ReplyCommentController.getOne);
router.get('/', ReplyCommentController.getAll);
router.delete('/:id', authMiddleware, ReplyCommentController.deleteOne);
router.put('/:id', authMiddleware, ReplyCommentController.changeOne);

module.exports = router;
