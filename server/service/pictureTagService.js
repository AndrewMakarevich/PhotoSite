const { PictureTag, PicturesTags } = require('../models/models');
const ApiError = require('../error/ApiError');

class PictureTagService {
    async createAndUpdate(tags, pictureId) {
        try {
            tags = JSON.parse(tags);
            tags.forEach(async (t) => {
                const tagText = t.text.split(' ').join('').toLowerCase();
                if (t.id) {
                    const tagExist = await PictureTag.findOne({
                        where: { text: tagText }
                    });
                    if (tagExist) {
                        PicturesTags.update(
                            { pictureTagId: tagExist.id },
                            { where: { pictureId, pictureTagId: t.id } }
                        );
                    } else {
                        const tag = await PictureTag.create({
                            text: tagText
                        });
                        PicturesTags.update(
                            { pictureTagId: tag.id },
                            { where: { pictureId, pictureTagId: t.id } }
                        );
                    }
                } else if (t.number) {
                    const tagExist = await PictureTag.findOne({
                        where: { text: tagText }
                    });
                    if (tagExist) {
                        PicturesTags.create(
                            { pictureId, pictureTagId: tagExist.id }
                        );
                    } else {
                        const tag = await PictureTag.create(
                            { text: tagText }
                        );
                        await PicturesTags.create(
                            { pictureId, pictureTagId: tag.id }
                        );
                    }
                }

            });
        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }

    }
    async findTagByText(text) {
        try {
            const textForSearch = text.split(' ').join('').toLowerCase();
            const tag = PictureTag
        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }
    }
}
module.exports = new PictureTagService();