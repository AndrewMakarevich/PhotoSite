import React from 'react';
import './pictureItem.css';

const PictureItem = ({picture}) =>{
    return(
        <div className="pictureItem-section">
            <span className="pictureItem-section-modalPointer"></span>
            <img className="pictureItem-section_image" src={picture.img} alt=""></img>
            <div className="pictureItem-section_background" style={{"backgroundImage": `url(${picture.img})`}}></div>
        </div>
    )
}
export default PictureItem;