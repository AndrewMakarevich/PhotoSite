import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../index';
import { createLike, getPictureLikes } from '../../../http/pictureLikeAPI';
import './likeItem.css';

const LikeItem = ({ picture }) => {
    const { user } = useContext(Context);
    const [amountOfLikes, setAmountOfLikes] = useState('');
    const [likeInfo, setLikeInfo] = useState([]);
    const [likeButtonStatus, setLikeButtonStatus] = useState('');

    const likeFunction = async (pictureId) => {
        try {
            await createLike(pictureId);
        } catch (e) {
            alert(e.response.data.message);
        }

    };
    const countLikeFunction = async (pictureId) => {
        try {
            const response = await getPictureLikes(pictureId, '');
            setAmountOfLikes(response.count);
            setLikeInfo(response.rows);


        } catch (e) {

        }
    };
    const checkIfLikedFunction = () => {
        try {
            let isLiked;
            if (likeInfo) {
                for (let i = 0; i < likeInfo.length; i++) {
                    if (likeInfo[i].userId === user._user.id) {
                        isLiked = true;
                        break;
                    } else {
                        isLiked = false;
                    }
                }
                if (isLiked === true) {
                    setLikeButtonStatus('alreadyLikedButton');
                } else {
                    setLikeButtonStatus('stillDontLikedButton');
                }
            }
        } catch (e) {
            console.log(e);
        }

    };
    useEffect(() => {
        countLikeFunction(picture.id);
    }, [picture]);
    useEffect(() => {
        checkIfLikedFunction();
    }, [likeInfo]);
    return (
        <div className="likeItem-mainBlock">
            <div className="likeItem-mainBlock_likeBlock ">
                <button
                    className={`likeItem-mainBlock_likeBlock_likeButton ${likeButtonStatus}`}
                    onClick={async () => {
                        await likeFunction(picture.id);
                        countLikeFunction(picture.id);
                    }}
                />
            </div>
            <div className="likeItem-mainBlock_infoBlock">
                Likes: {amountOfLikes}
            </div>
        </div>
    )
}

export default LikeItem;