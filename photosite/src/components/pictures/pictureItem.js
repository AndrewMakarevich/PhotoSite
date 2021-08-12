import React from 'react';
import './pictureItem.css';

const PictureItem = ({ picture }) => {
    return (
        <div className="pictureItem-section">
            <span className="pictureItem-section-modalPointer" />
            <img className="pictureItem-section_image" src={process.env.REACT_APP_API_URL + picture.img} alt="" />
            <div className="pictureItem-section_background" style={{ "backgroundImage": `url(${process.env.REACT_APP_API_URL + picture.img})` }} />
        </div>
    )
}
export default PictureItem;