import { $authHost } from './index';

export const deletePicturesTagsConnection = async (pictureId, pictureTagId) => {
    const { data } = await $authHost.delete(`api/picturesTags/${pictureId}?pictureTagId=${pictureTagId}`);
    return data;
};
