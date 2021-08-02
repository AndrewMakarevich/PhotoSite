const Router = require('express');
const router = new Router();
const pictureTagController = require('../controllers/pictureTagController');

router.post('/',pictureTagController.create);
router.get('/',pictureTagController.getAll);
router.get('/:id',pictureTagController.getOne);
router.delete('/', pictureTagController.deleteAll);
router.delete('/:id',pictureTagController.deleteOne);


module.exports = router;