import {$host} from './index';

export const getTypes = async()=>{
    const {data} = await $host.get('/api/type',{});
    return data.types;
}