const Router = require('express');
const router = new Router();
const commentLikeController = require('../controllers/commentLikeController');

router.post('/',commentLikeController.create);
router.get('/',commentLikeController.getAll);
router.get('/:id',commentLikeController.getOne);
router.delete('/',commentLikeController.deleteAll);
router.delete('/:id',commentLikeController.deleteOne);


module.exports = router;