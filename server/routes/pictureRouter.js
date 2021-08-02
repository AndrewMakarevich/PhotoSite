const Router = require('express');
const router = new Router();
const pictureController = require('../controllers/pictureController');

router.post('/',pictureController.create);
router.get('/',pictureController.getAll);
router.get('/:id',pictureController.getOne);
router.delete('/',pictureController.deleteAll);
router.delete('/:id',pictureController.deleteOne);




module.exports = router;