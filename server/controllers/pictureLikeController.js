const ApiError = require('../error/ApiError');
const { PictureLike, Picture } = require('../models/models');
const jwt = require('jsonwebtoken');

function getInfoFromToken(token) {
    return jwt.decode(token, process.env.SECRET_KEY);
}

class PictureLikeController {
    async create(req, res, next) {
        try {
            const { pictureId } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = getInfoFromToken(token);
            const userId = tokenInfo.id;
            const alreadyLiked = await PictureLike.findOne({
                where: { pictureId, userId }
            });
            if (alreadyLiked) {
                await PictureLike.destroy({
                    where: { id: alreadyLiked.id }
                });
                return res.json({ message: "Лайк успешно убран" });
            }
            const like = await PictureLike.create({ pictureId, userId });
            return res.json({ message: "Лайк успешно поставлен" });
        } catch (e) {
            next(e);
        }
    }
    async getAll(req, res) {
        try {
            const { pictureId, userId } = req.query;
            if (pictureId && userId) {
                const pictureLikes = await PictureLike.findAndCountAll({
                    where: { pictureId, userId }
                });
                return res.json(pictureLikes);
            }
            if (!pictureId && userId) {
                const pictureLikes = await PictureLike.findAndCountAll({
                    where: { userId }
                });
                return res.json(pictureLikes);
            }
            if (pictureId && !userId) {
                const pictureLikes = await PictureLike.findAndCountAll({
                    where: { pictureId }
                });
                return res.json(pictureLikes);
            }
            const pictureLikes = await PictureLike.findAndCountAll();
            return res.json(pictureLikes);
        } catch (e) {
            return res.json(ApiError.badRequest('Ошибка операции оценивания'));
        }

    }
    async getOne(req, res) {

    }
    async deleteOne(req, res) {
        try {
            const { pictureId } = req.query;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const pictureLike = await PictureLike.findOne({
                where: { pictureId, userId: tokenInfo.id }
            });
            if (!pictureLike) {
                return res.json(ApiError.badRequest('Лайк не поставлен'));
            }
            await PictureLike.destroy({
                where: { pictureId, userId: tokenInfo.id }
            });
            return res.json({ message: "Лайк успешно убран" });
        } catch (e) {
            return res.json(ApiError.badRequest('Ошибка удаления'));
        }

    }
}

module.exports = new PictureLikeController();