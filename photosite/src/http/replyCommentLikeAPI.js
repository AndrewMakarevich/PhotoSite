import { $host, $authHost } from './index';

export const getReplyCommentLikes = async (replyCommentId) => {
    const { data } = await $host.get(`api/replyCommentLike?replyCommentId=${replyCommentId}`);
    return data;
};

export const likeReplyComment = async (replyCommentId) => {
    const { data } = await $authHost.post(`api/replyCommentLike`, { replyCommentId });
    return data;
};