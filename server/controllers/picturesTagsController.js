const { PicturesTags } = require('../models/models');

class PicturesTagsController {
    async deleteAll(req, res, next) {
        try {
            const pictureId = req.params.id;
            const { pictureTagId } = req.query;
            await PicturesTags.destroy(
                { where: { pictureId, pictureTagId } }
            );
            return;
        } catch (e) {
            return res.json(`ERROR ${e}`);
        }

    }
}
module.exports = new PicturesTagsController();