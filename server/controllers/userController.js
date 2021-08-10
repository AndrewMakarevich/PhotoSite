const ApiError = require('../error/ApiError');
const userService = require("../service/userService");
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
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
            res.cookie('token', token,{maxAge: 24*60*60*1000, httpOnly: true});
            return res.json({token, message:`Ссылка активации аккаунта была отправлена на указанную почту: ${email}`});
        }catch(e){
            next(e);
        }
            
    }
    async login(req,res,next){
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email,password);
            res.cookie('token', userData.token,{maxAge: 24*60*60*1000, httpOnly: true});
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
    async getOne(req,res,next){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const userInfo = await userService.getOne(token);
            return res.json({userInfo});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new UserController();