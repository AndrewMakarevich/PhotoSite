const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { ReplyCommentLike } = require('../models/models');
const ReplyCommentLikeService = require('../service/replyCommentLikeService');
class ReplyCommentLikeController {
    async createAndDeleteLike(req, res, next) {
        try {
            const { replyCommentId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = jwt.verify(token, process.env.SECRET_KEY);
            const alreadyLiked = await ReplyCommentLike.findOne(
                { where: { replyCommentId, userId: tokenInfo.id } }
            );
            if (alreadyLiked) {
                const response = await ReplyCommentLikeService.delete(replyCommentId, tokenInfo.id);
                return res.json({ response });
            }
            const response = await ReplyCommentLikeService.create(replyCommentId, tokenInfo.id);
            return res.json({ response });
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const { replyCommentId } = req.query;
            const likes = await ReplyCommentLikeService.getAll(replyCommentId);
            return res.json(likes);
        } catch (e) {
            next(e);
        }
    }
}
module.exports = new ReplyCommentLikeController();