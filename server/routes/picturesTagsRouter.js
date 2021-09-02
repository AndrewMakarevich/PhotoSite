const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const PicturesTagsController = require('../controllers/picturesTagsController');

router.delete('/:id', authMiddleware, PicturesTagsController.deleteAll);

module.exports = router;