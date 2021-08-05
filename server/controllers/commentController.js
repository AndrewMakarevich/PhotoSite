const {Comment, CommentLike} = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

function getInfoFromToken(token){
    return jwt.decode(token, process.env.SECRET_KEY);
}

class CommentController {
    async create(req,res){
        try{
            const {text, pictureId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const comment = await Comment.create({text, userId: tokenInfo.id, pictureId});
            return res.json({comment});
        }catch(e){
            return res.json(ApiError.badRequest('Произошла непредвиденная ошибка при добавлении комментария'));
        }
    }
    async getAll(req,res){
        const {pictureId, userId} = req.query;
        if(!pictureId && !userId){
            const comments = await Comment.findAll({
               include:[{model: CommentLike, as: "comment_likes"}] 
            });
            return res.json({comments});           
        }
        if(!pictureId && userId){
            const comments = await Comment.findAll({
                where:{userId},
                include:[{model: CommentLike, as: "comment_likes"}]
            });
            return res.json({comments});
        }
        if(pictureId && !userId){
            const comments = await Comment.findAll({
                where:{pictureId},
                include:[{model: CommentLike, as: "comment_likes"}]
            });
            return res.json({comments});
        }
        const comments = await Comment.findAll({
            where:{pictureId, userId},
            include:[{model: CommentLike, as: "comment_likes"}]
        });
        return res.json({comments});
    }
    async getOne(req,res){
        
    }
    async deleteOne(req,res){
        try{
            const id = req.params.id;
            const {pictureId} = req.query;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const comment = await Comment.findOne({
                where:{id}
            });
            if(!comment){
                return res.json(ApiError.badRequest('Комментарий не найден'));
            }
            if(comment.userId != tokenInfo.id){
                return res.json(ApiError.badRequest('Невозможно удалить чужой комментарий'));
            }
            await CommentLike.destroy({
                where:{commentId: id}
            });
            await Comment.destroy({
                where:{id, userId: tokenInfo.id}
            });
            return res.json({message: "Комментарий удален"});
        }catch(e){
            return res.json(ApiError.badRequest('Непредвиденная ошибка при удалении комментария'));
        }
        
    }
    async deleteAll(req,res){
        
    }
}

module.exports = new CommentController();