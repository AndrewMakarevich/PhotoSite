const ApiError = require('../error/ApiError');
const { PictureInfo } = require('../models/models');

class PictureInfoController {
    async create(req, res) {

    }
    async getAll(req, res) {

    }
    async getOne(req, res) {

    }
    async deleteOne(req, res) {
        try {
            const id = req.params.id;
            PictureInfo.destroy({
                where: { id }
            });
            return res.json('Доп. информация удалена');
        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }
    async deleteAll(req, res) {
        // try {
        //     let { info } = req.body;
        //     console.log(info);
        //     if (info) {
        //         info = JSON.parse(info);
        //         info.forEach(i => {
        //             PictureInfo.destroy({
        //                 where: { id: i.id }
        //             });
        //         });
        //         return res.json('Доп. информация удалена');
        //     }
        // } catch (e) {
        //     throw ApiError.badRequest(e);
        // }

    }
}

module.exports = new PictureInfoController();