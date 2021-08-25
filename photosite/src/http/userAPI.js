import { $host, $authHost } from "./index";
import jwt_decode from 'jwt-decode';

export const registration = async (nickname, email, password) => {
    const { data } = await $host.post('api/user/registration', { nickname, email, password });
    return ({ token: jwt_decode(data.token), message: data.message });
};
export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.userData.token);
    return ({ token: jwt_decode(data.userData.token), message: data.message });
};
export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
};
export const getUserInfo = async () => {
    const { data } = await $authHost.get('api/user/info');
    return data.userInfo;
};
export const getUsers = async (userId) => {
    const { data } = await $host.get(`api/user/users?userId=${userId}`);
    return data;
};