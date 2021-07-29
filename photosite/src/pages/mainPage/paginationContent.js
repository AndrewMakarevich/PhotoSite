import React,{useContext, useEffect} from 'react';
import './mainPage.css';
import './aboutUs.css';
import scrollAnimation from './scrollAnimation';
import { Context } from '../../index';




function PaginationContent(props){
    useEffect(()=>{
        scrollAnimation();
    },[]);

    const {aboutUs} = useContext(Context);

    if(props.currentPagContent === 1){
        return(
            <>
                <div className="mainPagePagination-content first">

                </div>
            </>
        )
    }else if(props.currentPagContent === 2){
        
        return(
            <>
                <div className="mainPagePagination-content second">
                    <div className="mainPagePagination-content-second-header"><span/>A BIT ABOUT FUNCTIONALITY</div>
                    {
                        aboutUs.header.map((header,i) => {
                            console.log(i);
                            if(i%2){
                                return(
                                    <div className="mainPagePagination-content-aboutUsBlock">
                                        <div className="content-aboutUsBlock-visibleTextBlock">
                                            <span/>
                                            <div className="aboutUsBlock-visibleTextBlock-text">{header.text}</div>
                                        </div>
                                        <div className ="mainPagePagination-content-aboutUsBlock-header">
                                            <span className="content-aboutUsBlock-header-firstSpan">{header.visibleHeaderH1}</span>
                                            <span className="content-aboutUsBlock-header-secondSpan">{header.visibleHeaderAddText}</span>
                                            <div className="aboutUsBlock-header-h1">{header.hiddenHeaderH1}</div>
                                            <div className="aboutUsBlock-header-addInfo">{header.hiddenHeaderAddText}</div>
                                        </div>
                                        
                                    </div>
                                ) 
                            }else{
                                return(
                                    <div className="mainPagePagination-content-aboutUsBlock">
                                        <div className ="mainPagePagination-content-aboutUsBlock-header">
                                            <span className="content-aboutUsBlock-header-firstSpan">{header.visibleHeaderH1}</span>
                                            <span className="content-aboutUsBlock-header-secondSpan">{header.visibleHeaderAddText}</span>
                                            <div className="aboutUsBlock-header-h1">{header.hiddenHeaderH1}</div>
                                            <div className="aboutUsBlock-header-addInfo">{header.hiddenHeaderAddText}</div>
                                        </div>
                                        <div className="content-aboutUsBlock-visibleTextBlock">
                                            <span/>
                                            <div className="aboutUsBlock-visibleTextBlock-text">{header.text}</div>
                                        </div>
                                    </div>
                                )  
                            }
                                                           
                        })
                    }
                    <div className="mainPagePagination-content-second-author">
                        <div className="content-second-author-header"><span/>AUTHOR</div>
                        {
                            aboutUs.authorInfo.map(info => {
                                return(
                                        <div className="content-second-author-content">
                                    <div className="content-second-author-content-avatar">
                                        <div style={{backgroundImage: `url(${info.avatar})`}} className="author-content-avatar-BackgroundImage">
                                            {/* <img className="author-content-avatar-image" src={info.avatar}></img> */}
                                            <div className="author-content-avatar-image-imageText">
                                                {info.fullName}
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="content-second-author-content-info">
                                        <div className="author-content-info-topInfo">
                                            <div className="content-info-topInfo-firstColumn">
                                                <div className="info-topInfo-firstColumn-header">{info.header}</div>
                                                <div className="info-topInfo-firstColumn-mainText">{info.firstColumnText}</div>
                                            </div>
                                            <div className="content-info-topInfo-secondColumn">{info.secondColumnText}</div>
                                        </div>
                                        <div className="author-content-info-bottomInfo">
                                            <div className="info-bottomInfo-header">Contacts:</div>
                                            {
                                                (info.contacts.vk?
                                                    <a href={info.contacts.vk}><div className="info-bottomInfo-link vk"></div></a>
                                                    :
                                                    <></>
                                                )
                                            }
                                            {
                                                (info.contacts.instagram?
                                                    <a href={info.contacts.instagram}><div className="info-bottomInfo-link instagram"></div></a>
                                                    :
                                                    <></>
                                                )
                                            }
                                            {
                                               (info.contacts.linkedIn?
                                                    <a href={info.contacts.linkedIn}><div className="info-bottomInfo-link linkedIn"></div></a>
                                                    :
                                                    <></>
                                                ) 
                                            }
                                            {
                                                (info.contacts.twitter?
                                                    <a href={info.contacts.twitter}><div className="info-bottomInfo-link twitter"></div></a>
                                                    :
                                                    <></>
                                                )
                                            }
                                            {
                                                (info.contacts.youTube?
                                                    <a href={info.contacts.youTube}><div className="info-bottomInfo-link youtube"></div></a> 
                                                    :
                                                    <></>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                )
                                    
                            })
                        }
                        
                    </div>

                    
                </div>
            </>
        )
    }else{
        return(
            <>
                <div className="mainPagePagination-content third">

                </div>
            </>
        ) 
    }
}

export default PaginationContent;