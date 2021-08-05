const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const fs = require('fs');

const {Picture} = require('../models/models');
const {PictureInfo} = require('../models/models');
const {PictureTag} = require('../models/models');
const {PictureLike} = require('../models/models');
const {Comment, CommentLike} = require('../models/models');

async function deleteAddPicturesTables(modelName, id){
    await modelName.destroy({
        where:{pictureId: id}
    });
}

class PictureController {
    async create(req,res,next){
        try{
            let {header, description, userId, typeId, info, tags} = req.body;
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
            if(tags){
                tags = JSON.parse(tags);
                tags.forEach(t =>{
                    PictureTag.create({
                        text: t.text,
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
        try{
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
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка введенных данных'));
        }
        
    }
    async getOne(req,res){
        try{
            const {id} = req.params;
            const picture = await Picture.findOne({
                where:{id},
                include:[{model:PictureInfo, as: 'add_info'},{model:PictureTag, as: 'tags'},{model:Comment, as: 'comments'},{model:PictureLike, as: 'likes'}]
            });
            return res.json(picture);
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка поиска работы'));
        }
        
        
    }
    async deleteOne(req,res,next){
        try{
            const id = req.params.id;
            const picture = await Picture.findOne({
                where:{id}
            });
            if(!picture){
                throw ApiError.badRequest('Такой работы не существует');
            }
            const pictureImageName = picture.img;
            await deleteAddPicturesTables(PictureInfo, id);
            await deleteAddPicturesTables(PictureTag, id);
            await deleteAddPicturesTables(PictureLike, id);
            await deleteAddPicturesTables(Comment, id)
            await CommentLike.destroy({
                where:{commentId: null}
            });
            await Picture.destroy({
                where:{id}
            });
            await fs.unlink(path.resolve(__dirname, '..', 'static', pictureImageName),()=>{
                return res.json({message: "Работа успешно удалена. Название удаленного файла: " + pictureImageName});
            });
            
            
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }
}

module.exports = new PictureController();