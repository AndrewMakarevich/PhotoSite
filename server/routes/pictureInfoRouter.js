const Router = require('express');
const router = new Router();
const pictureInfoController = require('../controllers/pictureInfoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', pictureInfoController.create);
router.get('/', pictureInfoController.getAll);
router.get('/:id', pictureInfoController.getOne);
router.delete('/', authMiddleware, pictureInfoController.deleteAll);
router.delete('/:id', authMiddleware, pictureInfoController.deleteOne);


module.exports = router;