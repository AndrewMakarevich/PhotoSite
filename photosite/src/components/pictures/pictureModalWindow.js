import React, { useEffect, useState } from 'react';
import './pictureModalWindow.css';
import { getOnePicture } from '../../http/pictureAPI';

const PictureModalWindow = (props) => {
    const pictureId = props.pictureId;
    const [picture, setPicture] = useState({});
    useEffect(() => {
        getOnePicture(pictureId).then(data => {
            setPicture(data);
            console.log(data);
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
                    </section>
                    <section className="info-section">
                        <article className="info-section_header">
                            <button className="modal-mainLayer_block-closeButton">close</button>
                            HEADER: {picture.header}
                            ID:{picture.id}
                        </article>
                        <section className="info-section_description">
                            <h1>DESCRIPTION</h1>
                            <div>{picture.description}</div>
                        </section>
                        {
                            (picture.add_info ?
                                picture.add_info.map(pictureI => {
                                    return (
                                        <section key={pictureI.id} className="info-section_addInfo">
                                            <h2>{pictureI.title}</h2>
                                            <div>{pictureI.description}</div>
                                        </section>
                                    )
                                })
                                :
                                null
                            )
                        }
                        <section className="info-section_tags">
                            {
                                (picture.tags ?
                                    picture.tags.map(tag => {
                                        return (
                                            <div key={tag.id}>{tag.text}</div>
                                        )
                                    })
                                    :
                                    null
                                )
                            }
                        </section>
                    </section>


                </div>
            </div>
        </div>
    )
}
export default PictureModalWindow;