const {CommentLike} = require('../models/models');
const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');

function getInfoFromToken(token){
    return jwt.decode(token, process.env.SECRET_KEY);
}

class CommentLikeController {
    async create(req,res){
        try{
            const {commentId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = await getInfoFromToken(token);
            const likeExistence = await CommentLike.findOne({
                where:{commentId, userId: tokenInfo.id}
            });
            if(likeExistence){
                return res.json(ApiError.badRequest('Лайк уже поставлен'));
            }
            const commentLike = await CommentLike.create({commentId, userId: tokenInfo.id});  
            return res.json({commentLike});
        }catch(e){
            return res.json(ApiError.badRequest('Ошибка записи лайка'));
        }
        
    }
    async getAll(req,res){
        const {commentId, userId} = req.query;
        if(commentId && userId){
            const commentLikes = await CommentLike.findAll({
                where:{commentId,userId}
            });
            return res.json({commentLikes});
        }
        if(!commentId && userId){
            const commentLikes = await CommentLike.findAll({
                where:{userId}
            });
            return res.json({commentLikes});
        }
        if(commentId && !userId){
            const commentLikes = await CommentLike.findAll({
                where:{commentId}
            });
            return res.json({commentLikes});
        }
        const commentLikes = await CommentLike.findAll();
        return res.json({commentLikes});
    }
    async getOne(req,res){
        
    }
    async deleteOne(req,res){
        const {commentId} = req.query;
        if(!commentId){
            return res.json('Ошибка переданных данных');
        }
        const token = req.headers.authorization.split(' ')[1];
        const tokenInfo = getInfoFromToken(token);
        const commentLike = await CommentLike.findOne({
            where:{commentId, userId: tokenInfo.id}
        });
        if(!commentLike){
            return res.json(ApiError.badRequest('Лайк не поставлен'));
        }
        await CommentLike.destroy({
            where:{commentId, userId: tokenInfo.id}
        });
        return res.json({message:'Лайк удален'});
    }
    async deleteAll(req,res){
        
    }
}

module.exports = new CommentLikeController();