const Router = require('express');
const router = new Router();
const pictureLikeController = require('../controllers/pictureLikeController');

router.post('/',pictureLikeController.create);
router.get('/',pictureLikeController.getAll);
router.get('/:id', pictureLikeController.getOne);
router.delete('/', pictureLikeController.deleteAll);
router.delete('/:id', pictureLikeController.deleteOne);


module.exports = router;