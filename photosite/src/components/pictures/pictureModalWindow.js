import React from 'react';
import './pictureModalWindow.css';

const PictureModalWindow = (props)=>{
    const picture = props.picture;
    const pictureInfo = props.pictureInfo;
        return(      
            <div className='picture-modal hidden'>
                <div className="modal-mainLayer">
                    <div className="modal-mainLayer_block">
                        <section className="image-section">
                          <div className="image-section_background" style={{"backgroundImage": `url(${picture.img})`}} alt=''/>
                          <img className="image-section_image" src={picture.img} alt=''/>
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
                            
                                {pictureInfo.map(pictureI=>{
                                    return(
                                    <section key={pictureI.id} className="info-section_addInfo">
                                        <h2>{pictureI.title}</h2>
                                        <div>{pictureI.description}</div>
                                    </section> 
                                    )                                    
                                })}
                                                                                 
                        </section>
                        
                        
                    </div>
                </div>
            </div>
        )
    }
export default PictureModalWindow;