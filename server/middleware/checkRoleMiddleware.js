const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req,res,next){
        if(req.method = "OPTIONS"){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                throw ApiError.UnauthorizedError('Не авторизован');
            }
            const decoded = jwt.decode(token, process.env.SECRET_KEY);
            if(decoded.role != role){
                throw ApiError.forbidden('Нет доступа');
            }
            req.user = decoded;
        }catch(e){
            throw ApiError.badRequest(e.message);
        }
        
    };
};