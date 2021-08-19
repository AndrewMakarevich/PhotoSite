const uuid = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const fs = require('fs');

const { Picture } = require('../models/models');
const { PictureInfo } = require('../models/models');
const { PictureTag } = require('../models/models');
const { PictureLike } = require('../models/models');
const { Comment, CommentLike } = require('../models/models');

async function deleteAddPicturesTables(modelName, id) {
    await modelName.destroy({
        where: { pictureId: id }
    });
}

class PictureController {
    async create(req, res, next) {
        try {

            let { header, description, typeId, info, tags } = req.body;
            console.log("INFO" + header, description, typeId, info, tags);
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw ApiError.badRequest('Не авторизован');
            }
            const tokenInfo = jwt.decode(token, process.env.SECRET_KEY);
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            const picture = await Picture.create({ header, description, userId: tokenInfo.id, typeId, img: fileName });
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            if (info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    PictureInfo.create({
                        title: i.title,
                        description: i.description,
                        pictureId: picture.id
                    });
                });
            }
            if (tags) {
                tags = JSON.parse(tags);
                tags.forEach(t => {
                    PictureTag.create({
                        text: t.text,
                        pictureId: picture.id
                    });
                });
            }
            return res.json(picture);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        try {
            let { userId, typeId, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            let pictures;
            if (!userId && !typeId) {
                pictures = await Picture.findAndCountAll({ limit, offset });
            } else if (!userId && typeId) {
                pictures = await Picture.findAndCountAll({
                    where: { typeId }, limit, offset
                });
            } else if (userId && !typeId) {
                pictures = await Picture.findAndCountAll({
                    where: { userId }, limit, offset
                });
            } else if (userId && typeId) {
                pictures = await Picture.findAndCountAll({
                    where: { userId, typeId }, limit, offset
                });
            }
            return res.json(pictures);
        } catch (e) {
            return res.json(ApiError.badRequest('Ошибка введенных данных'));
        }

    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const picture = await Picture.findOne({
                where: { id },
                include: [{ model: PictureInfo, as: 'add_info' }, { model: PictureTag, as: 'tags' }, { model: Comment, as: 'comments' }, { model: PictureLike, as: 'likes' }]
            });
            return res.json(picture);
        } catch (e) {
            return res.json(ApiError.badRequest('Ошибка поиска работы'));
        }


    }
    async deleteOne(req, res, next) {
        try {
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = jwt.decode(token);
            const picture = await Picture.findOne({
                where: { id, userId: tokenInfo.id }
            });
            if (!picture) {
                throw ApiError.badRequest('Такой работы не существует или вы не являетесь ее автором');
            }
            const pictureImageName = picture.img;
            await deleteAddPicturesTables(PictureInfo, id);
            await deleteAddPicturesTables(PictureTag, id);
            await deleteAddPicturesTables(PictureLike, id);
            await deleteAddPicturesTables(Comment, id)
            await CommentLike.destroy({
                where: { commentId: null }
            });
            await Picture.destroy({
                where: { id }
            });
            await fs.unlink(path.resolve(__dirname, '..', 'static', pictureImageName), () => {
                return res.json({ message: "Работа успешно удалена. Название удаленного файла: " + pictureImageName });
            });


        } catch (e) {
            next(ApiError.badRequest(e.message));
        }

    }
    async changeOne(req, res, next) {
        try {
            let { header, description, typeId, info, tags } = req.body;
            const id = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const tokenInfo = jwt.decode(token);
            const picture = await Picture.findOne(
                { where: { id, userId: tokenInfo.id } }
            )
            if (!picture) {
                throw ApiError.badRequest('Такой работы не существует или вы не являетесь ее автором');
            }
            if (req.files) {
                const { img } = req.files;
                const picturePreviousFile = picture.img;
                const fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                await Picture.update(
                    { header, description, typeId, img: fileName },
                    { where: { id } }
                )
                if (info) {
                    info = JSON.parse(info);
                    console.log(info);
                    info.forEach(i => {
                        if (i.id) {
                            PictureInfo.update(
                                { title: i.title, description: i.description },
                                { where: { id: i.id } }
                            )
                        } else if (i.number) {
                            PictureInfo.create(
                                {
                                    title: i.title,
                                    description: i.description,
                                    pictureId: picture.id
                                }
                            )
                        }

                    })
                }
                if (tags) {
                    tags = JSON.parse(tags);
                    tags.forEach(t => {
                        if (t.id) {
                            PictureTag.update(
                                { text: t.text },
                                { where: { id: t.id } }
                            )
                        } else if (t.number) {
                            PictureTag.create(
                                {
                                    text: t.text,
                                    pictureId: picture.id
                                }
                            )
                        }

                    });
                }
                await fs.unlink(path.resolve(__dirname, '..', 'static', picturePreviousFile), () => {
                    return res.json({ message: "Работа успешно изменена 1" });
                });
            } else {
                await Picture.update(
                    { header, description, typeId },
                    { where: { id } }
                )
                if (info) {
                    info = JSON.parse(info);
                    console.log(info);
                    info.forEach(i => {
                        if (i.id) {
                            PictureInfo.update(
                                { title: i.title, description: i.description },
                                { where: { id: i.id } }
                            )
                        } else if (i.number) {
                            PictureInfo.create(
                                {
                                    title: i.title,
                                    description: i.description,
                                    pictureId: picture.id
                                }
                            )
                        }

                    })
                }

                if (tags) {
                    tags = JSON.parse(tags);
                    tags.forEach(t => {
                        if (t.id) {
                            PictureTag.update(
                                { text: t.text },
                                { where: { id: t.id } }
                            )
                        } else if (t.number) {
                            PictureTag.create(
                                {
                                    text: t.text,
                                    pictureId: picture.id
                                }
                            )
                        }

                    });
                }

                return res.json({ message: "Работа успешно изменена 2" });
            }
        } catch (e) {
            return res.json(e.message)
        }
    }
}

module.exports = new PictureController();