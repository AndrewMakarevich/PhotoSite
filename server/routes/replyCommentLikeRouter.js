const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const ReplyCommentLikeController = require('../controllers/replyCommentLikeController');

router.post('/', authMiddleware, ReplyCommentLikeController.createAndDeleteLike);
router.get('/', ReplyCommentLikeController.getAll);

module.exports = router;

