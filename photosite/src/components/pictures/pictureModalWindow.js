import React, { useEffect, useState } from 'react';
import './pictureModalWindow.css';
import { getOnePicture } from '../../http/pictureAPI';
import LikeItem from '../personalCabinet/likeBlock/likeItem';
import InfoAndCommentsContent from './pictureModalWindowPagContent';

const PictureModalWindow = ({ pictureId }) => {
    const [currentContent, setCurrentContent] = useState('info');
    const [picture, setPicture] = useState({});
    useEffect(() => {
        getOnePicture(pictureId).then(data => {
            setPicture(data);
        }
        );
    }, [pictureId]);
    return (
        <div className='picture-modal hidden'>
            <div className="modal-mainLayer">
                <div className="modal-mainLayer_block">
                    <section className="image-section">
                        <div className="image-section_background" style={{ "backgroundImage": `url(${process.env.REACT_APP_API_URL + picture.img})` }} alt='' />
                        <img className="image-section_image" src={process.env.REACT_APP_API_URL + picture.img} alt='' />
                        <LikeItem picture={picture} />
                    </section>
                    <section className="modal-mainLayer_block-paginationSection">
                        <section className="modal-mainLayer_block-paginationMenu">
                            <button className="modal-mainLayer_block-closeButton" onClick={() => setCurrentContent('info')}>close</button>
                            <button onClick={() => setCurrentContent('info')}>Info</button>
                            <button onClick={() => setCurrentContent('comments')}>Comments</button>
                        </section>
                        <InfoAndCommentsContent picture={picture} currentContent={currentContent} />
                    </section>

                </div>
            </div>
        </div>
    )
}
export default PictureModalWindow;