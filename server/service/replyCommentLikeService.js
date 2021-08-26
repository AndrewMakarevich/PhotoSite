const { ReplyCommentLike } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReplyCommentLikeService {
    async create(replyCommentId, userId) {
        try {
            const replyCommentLike = await ReplyCommentLike.create(
                { replyCommentId, userId }
            );
            return "Лайк успешно поставлен";
        } catch (e) {
            throw ApiError.badRequest(`ERROR: ${e}`);
        }

    }
    async delete(replyCommentId, userId) {
        try {
            await ReplyCommentLike.destroy(
                { where: { replyCommentId, userId } }
            );
            return "Лайк успешно удален";
        } catch (e) {
            throw ApiError.badRequest(`ERROR: ${e}`);
        }
    }
    async getAll(replyCommentId) {
        try {
            if (replyCommentId) {
                const likes = await ReplyCommentLike.findAndCountAll(
                    { where: { replyCommentId } }
                );
                return likes;
            }
            throw ApiError.badRequest(`Не указан id комментария`);
        } catch (e) {
            throw ApiError.badRequest(`ERROR: ${e}`);
        }
    }
}
module.exports = new ReplyCommentLikeService();