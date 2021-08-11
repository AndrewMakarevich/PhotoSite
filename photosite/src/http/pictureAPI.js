import {$authHost} from './index';

export const createPicture = async(picture)=>{
 const {data} = await $authHost.post('api/picture',picture);
 return data.message;
}
