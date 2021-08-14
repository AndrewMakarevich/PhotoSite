const Router = require('express');
const router = new Router();
const pictureTagController = require('../controllers/pictureTagController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', pictureTagController.create);
router.get('/', pictureTagController.getAll);
router.get('/:id', pictureTagController.getOne);
router.delete('/', authMiddleware, pictureTagController.deleteAll);
router.delete('/:id', authMiddleware, pictureTagController.deleteOne);


module.exports = router;