import React,{useEffect, useState} from 'react';
import './mainPage.css';
import Girl from '../../pictures/mainPagePhoto.jpg';
import Forest from '../../pictures/mainPageNature.jpg';
import Art from '../../pictures/mainPageArt.jpg';
import AnimateSlider from './photoAnimation';



const MainPage = () =>{

    const [value, setValue] = useState(0);

            useEffect(()=>{
                    AnimateSlider();
                    
            });
            return(
            <div className="mainPageBody">
                <div className="mainPageHeader"></div>
                <div className="mainPageContent">
                        <img className="backgroundPhotoFirst" src={Girl}/>
                        <img className="backgroundPhotoSecond" src={Forest}/>
                        <img className="backgroundPhotoThird" src={Art}/>
                </div>
                
            </div>

            )
           
}

export default MainPage;