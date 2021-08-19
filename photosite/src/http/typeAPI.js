import { $host, $authHost } from './index';

export const createType = async (name) => {
    const { data } = await $authHost.post('api/type', { name });
    return data;
};

export const getTypes = async () => {
    const { data } = await $host.get('/api/type', {});
    return data.types;
};

export const deleteTypes = async (id) => {
    const { data } = await $authHost.delete(`/api/type/${id}`);
    return data;
}

export const changeType = async (id, name) => {
    const { data } = await $authHost.put(`/api/type/${id}`, { name });
    return data.response;
}