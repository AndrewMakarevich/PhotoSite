const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const mailService = require('./mailService');

const generateJwt = (id, email, role) =>{
    return jwt.sign({
        id,
        email,
        role
    }, process.env.SECRET_KEY, {
        expiresIn: '24h'
    });
};

class userService{
    async registration(nickname,email,role,password){
        if (!nickname || !email || !password) {
            throw ApiError.badRequest('Одно из полей не заполнено');
        }
        const candidate1 = await User.findOne({
            where: {
                nickname
            }
        });
        const candidate2 = await User.findOne({
            where: {
                email
            }
        });
        if(candidate1 && candidate2){
            throw ApiError.badRequest('Пользователь с такой почтой и никнеймом уже существует');
        }
        if (candidate1) {
            throw ApiError.badRequest('Пользователь с таким никнеймом уже существует');
        }
        if (candidate2) {
            throw ApiError.badRequest('Пользователь с такой почтой уже существует');
        }
        
        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            nickname,
            email,
            role,
            password: hashPassword,
            activationLink
        });
        await mailService.sendActivationCode(email,`${process.env.API_URL}api/user/activate/${activationLink}`);
        const token = generateJwt(user.id, user.email, user.role);
        return token;           
    }
    async activate(activationLink){
        let user = await User.findOne({
            where:{activationLink}
        });
        if(!user){
            return {
                message: "пользователь не существует"
            };
        }
        await User.update(
            {isActivated: true},
            {where:{activationLink}});
        return {
            message:"аккаунт успешно активирован"
        }
    }
    async login(email, password){
            const user = await User.findOne({
                where:{email}
            });
            if(!user){
                throw ApiError.badRequest('Пользователь не существует');
            }
            if(user.isActivated == false){
                throw ApiError.badRequest('Аккаунт не активирован');
            }
            const passEquals = await bcrypt.compare(password, user.password);
            if(!passEquals){
                throw ApiError.badRequest('Неверный пароль');
            } 
            const token = generateJwt(user.id, user.email, user.role);
            return {token};
    }
    async check(id,email,role){
        const token = generateJwt(id, email, role);
        return token;
    }
    async getOne(token){
        try{
            if(!token){
                throw ApiError.UnauthorizedError("Ошибка авторизации");
            }
            const tokenInfo =  jwt.decode(token, process.env.SECRET_KEY);
            const user = await User.findOne({
                where:{
                    id: tokenInfo.id
                }
            });
            return {user:{
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                role: user.role,
                firstname: user.firstname,
                secondname: user.secondname
            }};
        }catch(e){
            throw ApiError.badRequest("Ошибка получения информации, попробуйте снова", e);
        }
    }
}

module.exports = new userService();