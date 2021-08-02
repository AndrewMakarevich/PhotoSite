const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');

router.post('/',commentController.create);
router.get('/',commentController.getAll);
router.get('/:id', commentController.getOne);
router.delete('/', commentController.deleteAll);
router.delete('/:id', commentController.deleteOne);


module.exports = router;