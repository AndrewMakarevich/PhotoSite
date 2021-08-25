const ApiError = require('../error/ApiError');
const { Type } = require('../models/models');
const { Picture } = require('../models/models');

const reservedNames = ['неопределена', 'неопределен', 'undefined'];

class typeService {
    async create(name) {
        const doublicate = await Type.findOne({
            where: { name }
        });
        if (doublicate) {
            throw ApiError.badRequest('Данная категория уже существует в базе данных');
        }
        const lowerName = (name.split(' ').join('')).toLowerCase();

        if (lowerName === "неопределена" || lowerName === "неопределен" || lowerName === "undefined") {
            throw ApiError.badRequest('Данный тип зарезервирован и не может быть создан');
        }
        const type = await Type.create({ name });
        return { type, message: "Тип уcпешно создан" };
    }
    async getAll() {
        const types = await Type.findAll();
        if (types.length == 0) {
            throw ApiError.badRequest('Типы отсутствуют');
        }
        return types;
    }
    async getOne(id) {
        const type = await Type.findOne({
            where: { id }
        });
        if (!type) {
            throw ApiError.badRequest('Категория не найдена');
        }
        return type;
    }
    async deleteOne(id) {
        try {
            const type = await Type.findOne({
                where: { id }
            });
            const undelType = await Type.findOne({
                where: { name: "Не определен" }
            });
            const picture = await Picture.findAll({
                where: { typeId: id }
            });
            if (!type) {
                throw ApiError.badRequest('Данной категории не существует');
            }
            if (undelType && type.id == undelType.id) {
                throw ApiError.badRequest('Данный тип нельзя удалить');
            }
            if (picture) {
                picture.forEach(picture => {
                    picture.update({
                        typeId: undelType.id
                    });
                });
            }
            const typeName = type.name;
            await Type.destroy({
                where: { id }
            });
            return `категория ${typeName} удалена`;
        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }
    async changeOne(id, name) {
        try {
            await Type.update(
                { name },
                { where: { id } }
            );
            return { response: "Категория успешно обновлена" };
        } catch (e) {
            throw ApiError.badRequest(e);
        }

    }

}

module.exports = new typeService();