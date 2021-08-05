const ApiError = require('../error/ApiError');
const {Type} = require('../models/models');

class typeService {
    async create(name){
        const doublicate = await Type.findOne({
            where:{name}
        });
        if(doublicate){
            throw ApiError.badRequest('Данная категория уже существует в базе данных');
        }
        const type = await Type.create({name});
        return type;
    }
    async getAll(){
        const types = await Type.findAll();
        if(types.length == 0){
            throw ApiError.badRequest('Типы отсутствуют');
        }
        return types;
    }
    async getOne(id){
        const type = await Type.findOne({
            where:{id}
        });
        if(!type){
            throw ApiError.badRequest('Категория не найдена');
        }
        return type;
    }
    async deleteOne(id){
        const type = await Type.findOne({
            where:{id}
        });
        if(!type){
            throw ApiError.badRequest('Данной категории не существует');
        }
        const typeName = type.name;
        await Type.destroy({
            where:{id}
        });
        return `категория ${typeName} удалена`;
    }

}

module.exports = new typeService();