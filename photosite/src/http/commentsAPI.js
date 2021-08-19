import { $authHost, $host } from './index';

export const postComment = async (text, pictureId) => {
    const { data } = await $authHost.post('/api/comments', { text, pictureId });
    return data;
};
export const postCommentChanges = async (id, text) => {
    const { data } = await $authHost.put(`/api/comments/${id}`, { text });
    return data;
};
export const getPictureComments = async (pictureId) => {
    const { data } = await $host.get(`/api/comments?pictureId=${pictureId}`);
    return data;
};