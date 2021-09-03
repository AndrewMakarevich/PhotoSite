import React, { useContext, useState } from 'react';
import { getPictures } from "../../http/pictureAPI";
import { Context } from '../../index';

const PictureSearchPanel = () => {
    const [userId, setUserId] = useState('');
    const [typeId, setTypeId] = useState('');
    const { picture } = useContext(Context);
    const getAndSetSearchedPictures = (text) => {
        getPictures(userId, typeId, text).then((data) => picture.setPictures(data.rows)).catch(e => alert(e.response.data.message));
    };
    return (
        <div>
            <input type="text" onChange={(e) => getAndSetSearchedPictures(e.target.value)}></input>
            <button>найти</button>
        </div>
    )
};
export default PictureSearchPanel;