const Router = require('express');
const router = new Router();
const pictureLikeController = require('../controllers/pictureLikeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware,pictureLikeController.create);
router.get('/',pictureLikeController.getAll);
router.get('/:id', pictureLikeController.getOne);
router.delete('/',authMiddleware, pictureLikeController.deleteOne);


module.exports = router;