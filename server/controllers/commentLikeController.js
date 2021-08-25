const { CommentLike } = require('../models/models');
const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');

function getInfoFromToken(token) {
    return jwt.decode(token, process.env.SECRET_KEY);
}

class CommentLikeController {
    async create(req, res, next) {
        try {
            const { commentId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const likeExistence = await CommentLike.findOne({
                where: { commentId, userId: tokenInfo.id }
            });
            if (likeExistence) {
                await CommentLike.destroy({
                    where: { id: likeExistence.id }
                });
                return res.json('Лайк успешно убран');
            }
            await CommentLike.create({ commentId, userId: tokenInfo.id });
            return res.json('Лайк успешно поставлен');
        } catch (e) {
            next(e);
        }

    }
    async getAll(req, res) {
        const { commentId, userId } = req.query;
        if (commentId && userId) {
            const commentLikes = await CommentLike.findAndCountAll({
                where: { commentId, userId }
            });
            return res.json({ commentLikes });
        }
        if (!commentId && userId) {
            const commentLikes = await CommentLike.findAndCountAll({
                where: { userId }
            });
            return res.json({ commentLikes });
        }
        if (commentId && !userId) {
            const commentLikes = await CommentLike.findAndCountAll({
                where: { commentId }
            });
            return res.json({ commentLikes });
        }
        const commentLikes = await CommentLike.findAndCountAll();
        return res.json({ commentLikes });
    }
    async getOne(req, res) {

    }
    async deleteOne(req, res) {
        const { commentId } = req.query;
        if (!commentId) {
            return res.json('Ошибка переданных данных');
        }
        const token = req.headers.authorization.split(' ')[1];
        const tokenInfo = getInfoFromToken(token);
        const commentLike = await CommentLike.findOne({
            where: { commentId, userId: tokenInfo.id }
        });
        if (!commentLike) {
            return res.json(ApiError.badRequest('Лайк не поставлен'));
        }
        await CommentLike.destroy({
            where: { commentId, userId: tokenInfo.id }
        });
        return res.json({ message: 'Лайк удален' });
    }
    async deleteAll(req, res) {

    }
}

module.exports = new CommentLikeController();