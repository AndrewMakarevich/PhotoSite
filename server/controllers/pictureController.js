const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

const {Picture} = require('../models/models');
const {PictureInfo} = require('../models/models');



class PictureController {
    async create(req,res,next){
        try{
            let {header, description, userId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4()+".jpg";
            const picture = await Picture.create({header,description,userId,typeId,img: fileName});
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            if(info){
                info = JSON.parse(info);
                info.forEach(i => {
                    PictureInfo.create({
                        title: i.title,
                        description: i.description,
                        pictureId: picture.id
                    });
                });
            }
            return res.json(picture);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        

        
    }
    async getAll(req,res){
        let {userId, typeId, limit, page} = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page*limit - limit;

        let pictures;
        if(!userId && !typeId){
            pictures = await Picture.findAndCountAll({limit, offset});
        }else if(!userId && typeId){
            pictures = await Picture.findAndCountAll({
                where:{typeId},limit,offset
            });
        }else if(userId && !typeId){
            pictures = await Picture.findAndCountAll({
                where:{userId},limit,offset
            });
        }else if(userId && typeId){
            pictures = await Picture.findAndCountAll({
                where:{userId,typeId},limit,offset
            });
        }
        return res.json(pictures);
    }
    async getOne(req,res){
        const {id} = req.params;
        const picture = await Picture.findOne({
            where:{id},
            include:[{model:PictureInfo, as: 'add_info'}]
        });
        return res.json(picture);
    }
    async deleteOne(req,res){
        
    }
    async deleteAll(req,res){
        
    }
}

module.exports = new PictureController();