import { $host, $authHost } from './index';


export const postReplyComment = async (text, commentId) => {
    const { data } = await $authHost.post('api/replyComment', { text, commentId });
    return data;
}
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