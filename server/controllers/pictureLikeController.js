const ApiError = require('../error/ApiError');
const {PictureLike, Picture} = require('../models/models');
const jwt = require('jsonwebtoken');

function getInfoFromToken(token){
    return jwt.decode(token, process.env.SECRET_KEY);
}

class PictureLikeController {
    async create(req,res){
        try{
            const {pictureId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = getInfoFromToken(token);
            const userId = tokenInfo.id;
            const alreadyLiked = await PictureLike.findOne({
                where:{pictureId, userId}
            });
            if(alreadyLiked){
                return res.json(ApiError.badRequest('Лайк пользователем уже был оставлен под данной работой'));
            }
            const like = await PictureLike.create({pictureId, userId});
            return res.json({like});
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка в введенных данных'));
        }
    }
    async getAll(req,res){
        try{
            const {pictureId, userId} = req.query;
            if(pictureId && userId){
                const pictureLikes = await PictureLike.findAll({
                    where:{pictureId, userId}
                });
                return res.json({pictureLikes});
            }
            if(!pictureId && userId){
                const pictureLikes = await PictureLike.findAll({
                    where:{userId}
                });
                return res.json({pictureLikes});
            }
            if(pictureId && !userId){
                const pictureLikes = await PictureLike.findAll({
                    where:{pictureId}
                });
                return res.json({pictureLikes});
            }
            const pictureLikes = await PictureLike.findAll();
            return res.json({pictureLikes});
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка опрерации оценивания'));
        }
        
    }
    async getOne(req,res){
        
    }
    async deleteOne(req,res){
        try{
            const {pictureId} = req.query;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const pictureLike = await PictureLike.findOne({
                where:{pictureId, userId: tokenInfo.id}
            });
            if(!pictureLike){
                return res.json(ApiError.badRequest('Лайк не поставлен'));
            }
            await PictureLike.destroy({
                where:{pictureId, userId: tokenInfo.id}
            });
            return res.json({message: "Лайк успешно убран"});
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка удаления'));
        }
        
    }
}

module.exports = new PictureLikeController();