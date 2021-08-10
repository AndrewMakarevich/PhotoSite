import React, {useContext, useState, useEffect} from 'react';
import { Context } from "../../index";
import PictureItem from './pictureItem';
import PictureModalWindow from './pictureModalWindow';
import showPictureModal from './pictureModalScript';
import './pictureItem.css';



const PictureList = () =>{
    const {picture} = useContext(Context);
    useEffect(()=>{
        showPictureModal();
        
    },[]);
    const [currentPicture, setCurrentPicture] = useState({
                id:"",
                header:"",
                description:"",
                img:""
    });
    const [pictureInfo, setPictureInfo] = useState([
        {
            id: "1",
            title: "Author",
            description: "Leonardo da Vinci"
        },
        {
            id: "2",
            title: "Year of creation",
            description: "15--"
        },
        {
            id: "3",
            title: "More about",
            description: "Some link"
        }
    ]);

    return(
        <>
            <PictureModalWindow picture={currentPicture} pictureInfo={pictureInfo}/>
            <div className="pictureList">
                {picture.pictures.map(picture=>{
                    return(
                        <div key={picture.id} className="pictureList-pictureBlock" onClick={
                            async ()=>{
                                await setCurrentPicture({id: picture.id, header: picture.header, description: picture.description, img: picture.img});
                                console.log({currentPicture});
                            }
                        }>
                            <PictureItem key={picture.id} picture={picture}/>  
                        </div>                        
                    )
                })}
                
            </div>
            
        </>
        
    )
};
export default PictureList;