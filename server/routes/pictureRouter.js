const Router = require('express');
const router = new Router();
const pictureController = require('../controllers/pictureController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, pictureController.create);
router.get('/', pictureController.getAll);
router.get('/:id', pictureController.getOne);
router.delete('/:id', authMiddleware, pictureController.deleteOne);
router.put('/:id', authMiddleware, pictureController.changeOne);




module.exports = router;