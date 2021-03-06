const { Type } = require("../models/models");
const typeService = require('../service/typeService');
const { Picture } = require('../models/models');
const ApiError = require('../error/ApiError');

class typeController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const resultOfCreation = await typeService.create(name);
            return res.json(resultOfCreation);
        } catch (e) {
            next(e);
        }

    }
    async getAll(req, res, next) {
        try {
            const types = await typeService.getAll();
            return res.json({ types });
        } catch (e) {
            next(e);
        }

    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const type = await typeService.getOne(id);
            return res.json({ type });
        } catch (e) {
            next(e);
        }

    }
    async deleteOne(req, res, next) {
        try {
            const id = req.params.id;
            const result = await typeService.deleteOne(id);
            return res.json({ result });
        } catch (e) {
            next(e);
        }
    }
    async changeOne(req, res, next) {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const data = await typeService.changeOne(id, name);
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new typeController();