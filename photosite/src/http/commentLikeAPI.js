import { $host, $authHost } from "./index";

export const likeComment = async (commentId) => {
    const { data } = await $authHost.post(`/api/commentLikes`, { commentId });
    return data;
};
export const getCommentLikes = async (commentId) => {
    const { data } = await $host.get(`/api/commentLikes?commentId=${commentId}`);
    return data;
};