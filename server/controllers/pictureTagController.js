const { PictureTag } = require('../models/models');
const ApiError = require('../error/ApiError');

class PictureTagController {
    async create(req, res) {

    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
    async deleteOne(req, res) {
        try {
            const id = req.params.id;
            await PictureTag.destroy({
                where: { id }
            });
            return res.json('Тэг удален');
        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }
    async deleteAll(req, res) {

    }
}

module.exports = new PictureTagController();