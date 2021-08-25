const jwt = require('jsonwebtoken');
const { ReplyComment } = require('../models/models');
const ReplyCommentService = require('../service/replyCommentService');
class ReplyCommentController {
    async create(req, res, next) {
        try {
            const { text, commentId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = jwt.verify(token, process.env.SECRET_KEY);
            const replyComment = await ReplyCommentService.create(text, tokenInfo.id, commentId);
            return res.json(replyComment);
        } catch (e) {
            next(e);
        }

    }
    async getOne(req, res, next) {

    }
    async getAll(req, res, next) {
        const { userId, commentId } = req.query;
        const replyComments = await ReplyCommentService.getAll(userId, commentId);
        return res.json(replyComments);

    }
    async deleteOne(req, res, next) {
        try {
            const id = req.params.id;
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                const tokenInfo = jwt.verify(token, process.env.SECRET_KEY);
                const response = await ReplyCommentService.deleteOne(id, tokenInfo.id);
                return res.json({ response });
            }
            throw ApiError.badRequest('Вы не авторизованы');



        } catch (e) {
            next(e);
        }

    }
    async changeOne(req, res, next) {
        try {
            const id = req.params.id;
            const { text } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = jwt.verify(token, process.env.SECRET_KEY);
            const response = await ReplyCommentService.changeOne(id, tokenInfo.id, text);
            return res.json({ response });
        } catch (e) {
            next(e);
        }

    }
}
module.exports = new ReplyCommentController();