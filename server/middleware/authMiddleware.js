const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

module.exports = async function(req,res,next){
    if(req.method == "OPTIONS"){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];// Bearer -token-
        if(!token){
            throw ApiError.UnauthorizedError({message:"Не авторизован"});
        }
        try{
            const tokenInfo = jwt.decode(token, process.env.SECRET_KEY);
            const user = await User.findOne({
                where: {id: tokenInfo.id, role: tokenInfo.role, email: tokenInfo.email}
            });
            if(!user){
                throw ApiError.badRequest("Пользователь не существует");
            }
           const decoded = jwt.verify(token, process.env.SECRET_KEY); 
           req.user = decoded;
           next();
        } catch(e){
            throw ApiError.badRequest("Невалидный токен");
        }    
    }catch(e){
        throw ApiError.badRequest("Ошибка проверки авторизации");
    }
};