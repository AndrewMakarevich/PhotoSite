import { $host, $authHost } from './index';

export const createLike = async (pictureId) => {
    const { data } = await $authHost.post('/api/pictureLikes', { pictureId });
    return data;
};
export const getPictureLikes = async (pictureId, userId) => {
    const { data } = await $authHost.get(`/api/pictureLikes?pictureId=${pictureId}&userId=${userId}`);
    return data;
}