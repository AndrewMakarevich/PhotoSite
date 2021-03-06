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
const replyCommentRouter = require('./replyCommentRouter');
const replyCommentLikeRouter = require('./replyCommentLikeRouter');

const picturesTagsRouter = require('./picturesTagsRouter');

router.use('/user', userRouter);
router.use('/picture', pictureRouter);
router.use('/pictureLikes', pictureLikeRouter);
router.use('/pictureInfo', pictureInfoRouter);
router.use('/pictureTag', pictureTagRouter);
router.use('/picturesTags', picturesTagsRouter);
router.use('/type', typeRouter);
router.use('/comments', commentRouter);
router.use('/commentLikes', commentLikeRouter);
router.use('/replyComment', replyCommentRouter);
router.use('/replyCommentLike', replyCommentLikeRouter);


module.exports = router;