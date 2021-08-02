const ApiError = require('../error/ApiError');
const userService = require("../service/userService");
const {validationResult} = require('express-validator');
const { User } = require('../models/models');


class UserController {
    async registration(req,res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('Ошибка валидации', errors.array()));
            }
            const {nickname, email, role, password} = req.body;
            const token = await userService.registration(nickname,email,role,password);
            return res.json({token});
        }catch(e){
            next(e);
        }
            
    }
    async login(req,res,next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email,password);
            return res.json({userData});
        }catch(e){
            next(e);
        }
    }
    async activate(req,res){
        try{
            const activationLink = req.params.link;
            const activation = await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e){
            next(e);
        }
        
    }
    async check(req,res,next){
        try{
            const token = await userService.check(req.user.id, req.user.email, req.user.role);
            return res.json({token});  
        }catch(e){
            next(e);
        }
              
    }
}

module.exports = new UserController();