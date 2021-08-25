import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../../../index";
import { observer } from 'mobx-react-lite';
import PictureItem from '../../pictures/pictureItem';
import PersonalPictureModalWindow from './personalPictureModalWindow';
import showPictureModal from '../../pictures/pictureModalScript';
import '../../pictures/pictureItem.css';

import { getPersonalPictures } from '../../../http/pictureAPI';



const PersonalPictureList = observer((props) => {
    const userId = props.userInfoId || '';
    const [personalPictures, setPersonalPictures] = useState('');
    const [pictureId, setPictureId] = useState('');
    const [typeId, setTypeId] = useState('');
    const [listLoading, setListLoading] = useState(true);
    const { picture } = useContext(Context);
    useEffect(() => {
        showPictureModal();
    }, []);
    useEffect(() => {
        showPictureModal();
        getPersonalPictures(userId, typeId).then(data => setPersonalPictures(data.rows)).finally(() => setListLoading(false));
    }, [userId, typeId]);
    if (!userId) {
        return (
            <div className="pictureList">Галерея загружается...</div>
        )
    }

    return (
        <>
            <PersonalPictureModalWindow pictureId={pictureId} />
            <div className="pictureList">
                {
                    (personalPictures ?
                        personalPictures.map(picture => {
                            return (
                                <div key={picture.id} className="pictureList-pictureBlock" onClick={
                                    async () => {
                                        await setPictureId(picture.id);
                                    }
                                }>
                                    <PictureItem key={picture.id} picture={picture} />
                                </div>
                            )
                        })
                        :
                        <div>Персональная галерея загружается</div>
                    )

                }


            </div>

        </>

    )
});
export default PersonalPictureList;