import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../index";
import { observer } from 'mobx-react-lite';
import PictureItem from './pictureItem';
import PictureModalWindow from './pictureModalWindow';
import showPictureModal from './pictureModalScript';
import './pictureItem.css';

import { getPictures } from '../../http/pictureAPI';



const PictureList = observer(({ type, userId }) => {
    const [pictureId, setPictureId] = useState('');
    const { picture } = useContext(Context);
    useEffect(() => {
        showPictureModal();
        getPictures(userId, type).then(data => picture.setPictures(data.rows));
    }, [type]);

    return (
        <>
            <PictureModalWindow pictureId={pictureId} />
            <div className="pictureList">
                {picture.pictures.map(picture => {
                    return (
                        <div key={picture.id} className="pictureList-pictureBlock" onClick={
                            async () => {
                                await setPictureId(picture.id);
                            }
                        }>
                            <PictureItem key={picture.id} picture={picture} />
                        </div>
                    )
                })}

            </div>

        </>

    )
});
export default PictureList;