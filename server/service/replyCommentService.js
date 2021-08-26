const jwt = require('jsonwebtoken');
const { ReplyComment, ReplyCommentLike } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReplyCommentService {
    async create(text, userId, commentId) {
        try {
            const replyComment = await ReplyComment.create(
                { text, userId, commentId }
            );
            return { replyComment };
        } catch (e) {
            throw ApiError.badRequest(`ERROR: ${e}`);
        }

    }
    async getAll(userId, commentId) {
        try {
            if (!userId && !commentId) {
                const replyComments = await ReplyComment.findAndCountAll(
                    { include: [{ model: ReplyCommentLike, as: "likes" }] }
                );
                return replyComments;
            }
            if (!userId && commentId) {
                const replyComments = await ReplyComment.findAndCountAll(
                    { where: { commentId }, include: [{ model: ReplyCommentLike, as: "likes" }] }
                );
                return replyComments;
            }
            if (userId && !commentId) {
                const replyComments = await ReplyComment.findAndCountAll(
                    { where: { userId }, include: [{ model: ReplyCommentLike, as: "likes" }] }
                );
                return replyComments;
            }
            const replyComments = await ReplyComment.findAndCountAll(
                { where: { userId, commentId }, include: [{ model: ReplyCommentLike, as: "likes" }] }
            );
            return replyComments;
        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }
    }
    async deleteOne(id, userId) {
        try {
            const replyComment = await ReplyComment.findOne(
                { where: { id } }
            );
            if (replyComment) {
                if (replyComment.userId === userId) {
                    await ReplyComment.destroy(
                        { where: { id } }
                    );
                    return 'Ответный комментарий успешно удален';
                } else {
                    throw ApiError.badRequest('Вы не являетесь автором данного комментария');
                }
            }


        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }
    }
    async changeOne(id, userId, text) {
        try {
            const replyComment = await ReplyComment.findOne(
                { where: { id } }
            );
            if (replyComment) {
                if (replyComment.userId === userId) {
                    await ReplyComment.update(
                        { text },
                        { where: { id } }
                    );
                    return 'Ответный комментарий успешно обновлен';
                } else {
                    throw ApiError.badRequest('Вы не являетесь автором данного комментария');
                }
            }
            throw ApiError.badRequest('Комментария не существует');

        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }
    }
};
module.exports = new ReplyCommentService();