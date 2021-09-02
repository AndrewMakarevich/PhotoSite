import { $authHost } from './index';

export const deleteInfo = async (id) => {
    const data = await $authHost.delete(`api/pictureInfo/${id}`);
    return data;
};