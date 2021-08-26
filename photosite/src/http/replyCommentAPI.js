import { $host, $authHost } from './index';

export const postReplyCommentChanges = async (replyCommentId, text) => {
    const { data } = await $authHost.put(`api/replyComment/${replyCommentId}`, { text });
    return data;
};
export const getAllReplyComments = async (commentId) => {
    const { data } = await $host.get(`api/replyComment?commentId=${commentId}`);
    return data;
};
export const deleteReplyComment = async (replyCommentId) => {
    const { data } = await $authHost.delete(`api/replyComment/${replyCommentId}`);
    return data;
};