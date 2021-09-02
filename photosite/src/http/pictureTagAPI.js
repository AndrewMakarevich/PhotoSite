import { $authHost } from './index';

export const deleteTag = async (id) => {
    const data = await $authHost.delete(`api/pictureTag/${id}`);
    return data;
};