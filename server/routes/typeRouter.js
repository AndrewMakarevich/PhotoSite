const {Router} = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.post('/',typeController.create);
router.get('/',typeController.getAll);
router.get('/:id',typeController.getOne);
router.delete('/',typeController.deleteAll);
router.delete('/:id',typeController.deleteOne);

module.exports = router;

