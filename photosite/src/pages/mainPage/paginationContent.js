import React, { useContext, useEffect, useState } from 'react';
import './mainPage.css';
import './aboutUs.css';
import './gallery.css';
import getOptionsInfo from '../../components/personalCabinet/getOptionsInfo';
import PictureSearchPanel from '../../components/pictureSearchBlock/PictureSearchPanel';
import scrollAnimation from './scrollAnimation';
import { Context } from '../../index';
import { getTypes } from '../../http/typeAPI';
import { observer } from 'mobx-react-lite';

import PictureList from '../../components/pictures/pictureList';




const PaginationContent = observer((props) => {
    const [type, setType] = useState('');
    const [userId, setUserId] = useState('');
    const { aboutUs } = useContext(Context);
    const { picture } = useContext(Context);
    useEffect(() => {
        scrollAnimation();
        getTypes().then(data => picture.setType(data));
    }, []);

    if (props.currentPagContent === 1) {
        return (
            <>
                <div className="mainPagePagination-content first">
                    <select onChange={(e) => {
                        setType(getOptionsInfo(e.target, e.target.selectedIndex));
                        if (e.target.selectedIndex === 0) {
                            setType('');
                        }
                    }}>
                        <option>Все</option>
                        {picture.type.map((type) => {
                            return (
                                <option id={type.id} key={type.id}>{type.name}</option>
                            )
                        })}
                    </select>
                    <PictureSearchPanel />
                    <PictureList type={type} userId={userId} />

                </div>
            </>
        )
    } else if (props.currentPagContent === 2) {

        return (
            <>
                <div className="mainPagePagination-content second">
                    <div className="mainPagePagination-content-second-header"><span />A BIT ABOUT FUNCTIONALITY</div>
                    {
                        aboutUs.header.map((header, i) => {
                            if (i % 2) {
                                return (
                                    <div className="mainPagePagination-content-aboutUsBlock">
                                        <div className="content-aboutUsBlock-visibleTextBlock">
                                            <span />
                                            <div className="aboutUsBlock-visibleTextBlock-text">{header.text}</div>
                                        </div>
                                        <div className="mainPagePagination-content-aboutUsBlock-header">
                                            <span className="content-aboutUsBlock-header-firstSpan">{header.visibleHeaderH1}</span>
                                            <span className="content-aboutUsBlock-header-secondSpan">{header.visibleHeaderAddText}</span>
                                            <div className="aboutUsBlock-header-h1">{header.hiddenHeaderH1}</div>
                                            <div className="aboutUsBlock-header-addInfo">{header.hiddenHeaderAddText}</div>
                                        </div>

                                    </div>
                                )
                            } else {
                                return (
                                    <div className="mainPagePagination-content-aboutUsBlock">
                                        <div className="mainPagePagination-content-aboutUsBlock-header">
                                            <span className="content-aboutUsBlock-header-firstSpan">{header.visibleHeaderH1}</span>
                                            <span className="content-aboutUsBlock-header-secondSpan">{header.visibleHeaderAddText}</span>
                                            <div className="aboutUsBlock-header-h1">{header.hiddenHeaderH1}</div>
                                            <div className="aboutUsBlock-header-addInfo">{header.hiddenHeaderAddText}</div>
                                        </div>
                                        <div className="content-aboutUsBlock-visibleTextBlock">
                                            <span />
                                            <div className="aboutUsBlock-visibleTextBlock-text">{header.text}</div>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                    <div className="mainPagePagination-content-second-author">
                        <div className="content-second-author-header"><span />AUTHOR</div>
                        {
                            aboutUs.authorInfo.map(info => {
                                return (
                                    <div className="content-second-author-content">
                                        <div className="content-second-author-content-avatar">
                                            <div style={{ backgroundImage: `url(${info.avatar})` }} className="author-content-avatar-BackgroundImage">
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
                                                    (info.contacts.vk ?
                                                        <a href={info.contacts.vk}><div className="info-bottomInfo-link vk"></div></a>
                                                        :
                                                        <></>
                                                    )
                                                }
                                                {
                                                    (info.contacts.instagram ?
                                                        <a href={info.contacts.instagram}><div className="info-bottomInfo-link instagram"></div></a>
                                                        :
                                                        <></>
                                                    )
                                                }
                                                {
                                                    (info.contacts.linkedIn ?
                                                        <a href={info.contacts.linkedIn}><div className="info-bottomInfo-link linkedIn"></div></a>
                                                        :
                                                        <></>
                                                    )
                                                }
                                                {
                                                    (info.contacts.twitter ?
                                                        <a href={info.contacts.twitter}><div className="info-bottomInfo-link twitter"></div></a>
                                                        :
                                                        <></>
                                                    )
                                                }
                                                {
                                                    (info.contacts.youTube ?
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
    } else {
        return (
            <>
                <div className="mainPagePagination-content third">

                </div>
            </>
        )
    }
});

export default PaginationContent;