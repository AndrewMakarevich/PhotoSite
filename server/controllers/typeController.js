const {Type} = require("../models/models");

class typeController{
    async create(req,res){
        const {name} = req.body;
        const type = await Type.create({name});
        return res.json({message: "тип успешно создан"});
    }
    async getAll(req,res){
        const types = await Type.findAll();
        return res.json(types);
    }
    async getOne(req,res){
        const {id} = req.params;
        const type = await Type.findOne({
            where:{id}
        });
        return res.json(type);
    }
    async deleteOne(req,res){
        
    }
    async deleteAll(req,res){
        
    }
}

module.exports = new typeController();