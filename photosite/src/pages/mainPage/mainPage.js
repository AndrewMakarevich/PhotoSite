import React,{useEffect, useState} from 'react';
import './mainPage.css';
import Girl from '../../pictures/mainPagePhoto.jpg';
import Forest from '../../pictures/mainPageNature.jpg';
import Art from '../../pictures/mainPageArt.jpg';
import AnimateSlider from './photoAnimation';
import animateHeader from './headerAnimation';



const textSample1 ='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose';

const textSample2='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum';
const MainPage = () =>{

    

            useEffect(()=>{
                    AnimateSlider(); 
                    animateHeader();         
            },[]);
            return(
            <div className="mainPageBody">
                <div className='mainPageBodyHeader'>
                        <div className='mainPageBodyHeader-h1'>
                                <span className="mainPageBodyHeader-h1-firstSpan"></span>
                                <span className="mainPageBodyHeader-h1-secondSpan"></span>
                                <span className="mainPageBodyHeader-h1-thirdSpan"></span>
                                HEADER
                                <span className="mainPageBodyHeader-h1-fourthSpan"></span>
                                <span className="mainPageBodyHeader-h1-fifthSpan"></span>
                                <span className="mainPageBodyHeader-h1-sixthSpan"></span>
                        </div>
                        <div className='mainPageBodyHeader-h2'>SOME OTHER TEXT</div>
                        <div className='mainPageBodyHeader-h3'>AND ONE MORE</div>
                </div>
                <div className="mainPageContent">
                        <div className='mainPageContent-icons pauseIcon'></div>
                        <div className="backgroundAddInfo">
                                <div className="backgroundAddInfo-header">
                                        FIRST PHOTO
                                </div>
                                <div className="backgroundAddInfo-mainBlock">
                                        <div className="backgroundAddInfo-mainBlock-firstColumn">{textSample2}</div>
                                        <div className="backgroundAddInfo-mainBlock-secondColumn">{textSample1}</div>
                                </div>
                        </div>
                        <div className="backgroundAddInfo">
                                <div className="backgroundAddInfo-header">
                                        SECOND PHOTO
                                </div>
                                <div className="backgroundAddInfo-mainBlock">
                                        <div className="backgroundAddInfo-mainBlock-firstColumn">{textSample2}</div>
                                        <div className="backgroundAddInfo-mainBlock-secondColumn">{textSample1}</div>
                                </div>
                        </div>
                        <div className="backgroundAddInfo">
                        <div className="backgroundAddInfo-header">
                                        THIRD PHOTO
                                </div>
                                <div className="backgroundAddInfo-mainBlock">
                                        <div className="backgroundAddInfo-mainBlock-firstColumn">{textSample2}</div>
                                        <div className="backgroundAddInfo-mainBlock-secondColumn">{textSample1}</div>
                                </div>
                        </div>
                        <img className="backgroundPhotoFirst" src={Girl}/>
                        <img className="backgroundPhotoSecond" src={Forest}/>
                        <img className="backgroundPhotoThird" src={Art}/>
                </div>
                
            </div>

            )
           
}

export default MainPage;