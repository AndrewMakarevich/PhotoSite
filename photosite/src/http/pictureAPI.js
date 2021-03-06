import { $host, $authHost } from './index';


export const getPictures = async (userId, typeId, text) => {
    if (text) {
        const { data } = await $host.get(`api/picture/?userId=${userId}&typeId=${typeId}&text=${text}`);
        return data;
    } else {
        const { data } = await $host.get(`api/picture/?userId=${userId}&typeId=${typeId}`);
        return data;
    }
};
export const getPersonalPictures = async (userId, typeId) => {
    const { data } = await $host.get(`api/picture/?userId=${userId}&typeId=${typeId}`);
    return data;
};
export const getOnePicture = async (id) => {
    const { data } = await $host.get(`api/picture/${id}`, { id });
    return data;
};
export const createPicture = async (picture) => {
    const { data } = await $authHost.post('api/picture', picture);
    return data.message;
};
export const updatePicture = async (picture, id) => {
    const { data } = await $authHost.put(`api/picture/${id}`, picture);
    return data.message;
};
