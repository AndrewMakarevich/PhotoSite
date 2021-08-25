const { Comment, CommentLike, User, ReplyComment } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

function getInfoFromToken(token) {
    return jwt.decode(token, process.env.SECRET_KEY);
}

class CommentController {
    async create(req, res, next) {
        try {
            const { text, pictureId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const textFulness = text.split(' ').join('');
            if (textFulness) {
                const comment = await Comment.create({ text, userId: tokenInfo.id, pictureId });
                return res.json({ comment });
            } else {
                throw ApiError.badRequest('Сервер: Комментарий пуст');
            }

        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res) {
        try {
            const { pictureId, userId } = req.query;
            if (!pictureId && !userId) {
                const comments = await Comment.findAll({
                    include: [{ model: CommentLike, as: "comment_likes" }, { model: ReplyComment, as: "reply_comments" }]
                });
                return res.json({ comments });
            }
            if (!pictureId && userId) {
                const comments = await Comment.findAll({
                    where: { userId },
                    include: [{ model: CommentLike, as: "comment_likes" }, { model: ReplyComment, as: "reply_comments" }]
                });
                return res.json({ comments });
            }
            if (pictureId && !userId) {
                const comments = await Comment.findAll({
                    where: { pictureId },
                    include: [{ model: CommentLike, as: "comment_likes" }, { model: ReplyComment, as: "reply_comments" }]
                });
                return res.json({ comments });
            }
            const comments = await Comment.findAll({
                where: { pictureId, userId },
                include: [{ model: CommentLike, as: "comment_likes" }, { model: ReplyComment, as: "reply_comments" }]
            });
            return res.json({ comments });
        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }
    async getOne(req, res) {

    }
    async deleteOne(req, res) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const comment = await Comment.findOne({
                where: { id }
            });
            if (!comment) {
                return res.json(ApiError.badRequest('Комментарий не найден'));
            }
            if (comment.userId != tokenInfo.id) {
                return res.json(ApiError.badRequest('Невозможно удалить чужой комментарий'));
            }
            await CommentLike.destroy({
                where: { commentId: id }
            });
            await Comment.destroy({
                where: { id, userId: tokenInfo.id }
            });
            return res.json({ message: "Комментарий удален" });
        } catch (e) {
            return res.json(ApiError.badRequest('Непредвиденная ошибка при удалении комментария'));
        }

    }
    async deleteAll(req, res) {

    }
    async changeOne(req, res) {
        try {
            const { text } = req.body;
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const comment = await Comment.findOne({
                where: { id }
            });
            if (comment.userId === tokenInfo.id) {
                await Comment.update(
                    { text },
                    { where: { id } }
                );
                return res.json('Комментарий успешно обновлен')
            } else {
                throw ApiError.badRequest('Вы не явялетесь автором этого комментария');
            }

        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }
}

module.exports = new CommentController();