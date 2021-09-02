const { PictureInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class PictureInfoService {
    async createAndUpdate(info, pictureId) {
        try {
            info = JSON.parse(info);
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
                            pictureId
                        }
                    );
                }

            });
        } catch (e) {
            throw ApiError.badRequest(`ERROR ${e}`);
        }

    }
}
module.exports = new PictureInfoService();