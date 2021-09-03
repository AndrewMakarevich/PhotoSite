const uuid = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const fs = require('fs');

const { Op } = require('sequelize');

const { Picture } = require('../models/models');
const { PictureInfo } = require('../models/models');
const { PictureTag } = require('../models/models');
const { PictureLike } = require('../models/models');
const { PicturesTags } = require('../models/models');
const { Comment, CommentLike } = require('../models/models');

const PictureTagService = require('../service/pictureTagService');
const PictureInfoService = require('../service/pictureInfoService');

async function deleteAddPicturesTables(modelName, id) {
    await modelName.destroy({
        where: { pictureId: id }
    });
}


class PictureController {
    async create(req, res, next) {
        try {

            let { header, description, typeId, info, tags } = req.body;
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
                tags.forEach(async (t) => {
                    const text = t.text.split(' ').join('').toLowerCase();
                    const existTag = await PictureTag.findOne({
                        where: { text }
                    });
                    if (existTag) {
                        PicturesTags.create({
                            pictureId: picture.id,
                            pictureTagId: existTag.id
                        });
                    } else {
                        const tag = await PictureTag.create({
                            text
                        });
                        PicturesTags.create({
                            pictureId: picture.id,
                            pictureTagId: tag.id
                        });
                    }

                });
            }
            return res.json(picture);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        try {
            let { userId, typeId, text, limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            // ПОИСКОВАЯ СИСТЕМА
            let equalTags = [];
            if (text) {
                text = text.toLowerCase();
                const searchWordsArray = text.split(' ');
                // Выборка тегов, содержащих поисковой текст в виде подстроки
                for (let i = 0; i < searchWordsArray.length; i++) {
                    const tags = await PictureTag.findAll({
                        where: {
                            text: {
                                [Op.substring]: searchWordsArray[i]
                            }
                        }
                    })
                    if (tags) {
                        tags.forEach(tag => {

                            let tagExistence;
                            // Проверка наличия дубликатов
                            for (let i = 0; i < equalTags.length; i++) {
                                if (equalTags[i].id === tag.id) {
                                    tagExistence = true;
                                    break;
                                } else {
                                    tagExistence = false;
                                    continue;
                                }
                            }
                            // Избавление от дубликатов 
                            if (!tagExistence) {
                                equalTags = [...equalTags, tag]
                            }
                        })
                    }
                }
                // Поиск ID картин, имеющих связи с полученными тэгами

                if (equalTags) {
                    let equalPicturesId = [];
                    for (let i = 0; i < equalTags.length; i++) {
                        const equalPicturesTags = await PicturesTags.findAll(
                            { where: { pictureTagId: equalTags[i].id } }
                        )
                        if (equalPicturesTags) {
                            equalPicturesTags.forEach(pictureTagRelation => {
                                if (!equalPicturesId.includes(pictureTagRelation.pictureId)) {
                                    equalPicturesId = [...equalPicturesId, pictureTagRelation.pictureId]
                                }
                            });

                        }
                    };
                    // return res.json({ equalPicturesId, equalTags })

                    if (equalPicturesId) {
                        let equalPictures = [];
                        for (let i = 0; i < equalPicturesId.length; i++) {
                            const pictures = await Picture.findAndCountAll(
                                { where: { id: equalPicturesId[i] } }
                            );
                            pictures.rows.forEach(picture => {
                                equalPictures = [...equalPictures, picture];
                            })
                        }
                        return res.json({ count: equalPictures.length, rows: equalPictures });
                    }

                } else {
                    return res.json('no')
                }

            }

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
            return res.json(ApiError.badRequest(`ERROR ${e}`));
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
            await deleteAddPicturesTables(PicturesTags, id);
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
                    await PictureInfoService.createAndUpdate(info, picture.id);
                }
                if (tags) {
                    await PictureTagService.createAndUpdate(tags, picture.id);
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
                    await PictureInfoService.createAndUpdate(info, picture.id);
                }
                if (tags) {
                    await PictureTagService.createAndUpdate(tags, picture.id);
                }
                return res.json({ message: "Работа успешно изменена 2" });
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PictureController();