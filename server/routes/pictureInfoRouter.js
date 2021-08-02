const Router = require('express');
const router = new Router();
const pictureInfoController = require('../controllers/pictureInfoController');

router.post('/',pictureInfoController.create);
router.get('/',pictureInfoController.getAll);
router.get('/:id', pictureInfoController.getOne);
router.delete('/', pictureInfoController.deleteAll);
router.delete('/:id', pictureInfoController.deleteOne);


module.exports = router;