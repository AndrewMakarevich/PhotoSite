const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const pictureRouter = require('./pictureRouter');
const pictureLikeRouter = require('./pictureLikeRouter');
const pictureInfoRouter = require('./pictureInfoRouter');
const pictureTagRouter = require('./pictureTagRouter');
const typeRouter = require('./typeRouter');
const commentRouter = require('./commentRouter');
const commentLikeRouter = require('./commentLikeRouter');

router.use('/user',userRouter);
router.use('/picture',pictureRouter);
router.use('/picture/likes',pictureLikeRouter);
router.use('/picture/info',pictureInfoRouter);
router.use('/picture/tags',pictureTagRouter);
router.use('/type',typeRouter);
router.use('/comments',commentRouter);
router.use('/comments/likes',commentLikeRouter);


module.exports = router;