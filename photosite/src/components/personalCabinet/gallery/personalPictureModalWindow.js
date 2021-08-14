import React, { useState, useEffect, useContext } from 'react';
import { getOnePicture, updatePicture } from '../../../http/pictureAPI';
import { deleteInfo } from '../../../http/pictureInfoAPI';
import { deleteTag } from '../../../http/pictureTagAPI';

import { Context } from '../../../index';
import getOptionsInfo from '../getOptionsInfo';

const PersonalPictureModalWindow = (props) => {
    const { picture } = useContext(Context);

    const pictureId = props.pictureId;
    const [currentPicture, setCurrentPicture] = useState({});

    // СОСТОЯНИЯ ДЛЯ ИЗМЕНЕНИЯ ДАННЫХ
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [img, setImg] = useState(null);

    const [PictureInfo, setPictureInfo] = useState([]);
    const [deletedPictureInfo, setDeletedPictureInfo] = useState([]);
    const [newPictureInfo, setNewPictureInfo] = useState([]);

    const [PictureTags, setPictureTags] = useState([]);
    const [deletedPictureTags, setDeletedPictureTags] = useState([]);
    const [newPictureTags, setNewPictureTags] = useState([]);
    console.log(deletedPictureTags);


    // ALREADY CREATED PICTURE INFOS FUNCTIONS
    const changePictureInfo = (key, value, id) => {
        setPictureInfo(PictureInfo.map(info => {
            if (info.id === id) {
                return (
                    { ...info, [key]: value }
                );
            }
            return info;
        }));
    };
    const deletePictureInfo = (info) => {
        setDeletedPictureInfo([...deletedPictureInfo, info]);
        setPictureInfo(PictureInfo.filter(inf => {
            return (inf.id !== info.id);
        }));
    };


    // NEW PICTURE INFO FUNCTIONS
    const addNewPictureInfo = () => {
        setNewPictureInfo([...newPictureInfo, { title: '', description: '', number: Date.now() }]);
    };
    const changeNewPictureInfo = (key, value, number) => {
        setNewPictureInfo(newPictureInfo.map(info => {
            if (info.number === number) {
                return { ...info, [key]: value };
            }
            return info;
        }));
    };
    const deleteNewPictureInfo = (number) => {
        setNewPictureInfo(newPictureInfo.filter(info => {
            return info.number !== number;
        }));
    };



    // ALREADY CREATED TAGS FUNCTIONS
    const changePictureTag = (key, value, id) => {
        setPictureTags(PictureTags.map(tag => {
            if (tag.id === id) {
                return (
                    { ...tag, [key]: value }
                );
            }
            return tag;
        }));
    };
    const deletePictureTag = (tag) => {
        setPictureTags(PictureTags.filter(t => {
            return (t.id !== tag.id);
        }))
        setDeletedPictureTags([...deletedPictureTags, tag]);
    }


    // NEW TAGS FUNCTIONS
    const addNewPictureTag = () => {
        setNewPictureTags([...newPictureTags, { text: "", number: Date.now() }]);
    };
    const changeNewPictureTag = (key, value, number) => {
        setNewPictureTags(newPictureTags.map(tag => {
            if (tag.number === number) {
                return { ...tag, [key]: value };
            }
            return tag;
        }));
    };
    const deleteNewPictureTag = (number) => {
        setNewPictureTags(newPictureTags.filter(tag => {
            return (tag.number !== number);
        }))
    };

    const acceptLoadChanges = async () => {
        const formData = new FormData();
        formData.append('header', header);
        formData.append('description', description);
        formData.append('typeId', type);
        formData.append('img', img);
        formData.append('info', JSON.stringify([...PictureInfo, ...newPictureInfo]));
        formData.append('tags', JSON.stringify([...PictureTags, ...newPictureTags]));
        const response = await updatePicture(formData, pictureId);
        deletedPictureInfo.forEach(i => {
            deleteInfo(i.id);
        });
        deletedPictureTags.forEach(t => {
            deleteTag(t.id);
        });
        alert(response);
    };
    useEffect(() => {
        getOnePicture(pictureId).then(data => {
            setCurrentPicture(data);
        });
    }, [pictureId]);
    useEffect(() => {
        setHeader(currentPicture.header);
        setDescription(currentPicture.description);
        setPictureInfo(currentPicture.add_info);
        setPictureTags(currentPicture.tags);
        setType(currentPicture.typeId);
    }, [currentPicture]);
    return (
        <div className='picture-modal hidden'>
            <div className="modal-mainLayer">
                <div className="modal-mainLayer_block">
                    <section className="image-section">
                        <div className="image-section_photochange">
                            <button>Сбросить загруженное фото</button>
                            <input type="file" onChange={(e) => setImg(e.target.files[0])}></input>
                        </div>
                        <div className="image-section_background" style={{ "backgroundImage": `url(${process.env.REACT_APP_API_URL + currentPicture.img})` }} alt='' />
                        <img className="image-section_image" src={process.env.REACT_APP_API_URL + currentPicture.img} alt='' />
                    </section>
                    <section className="info-section">
                        <article className="info-section_type">
                            <select onChange={(e) => setType(getOptionsInfo(e.target, e.target.selectedIndex))}>
                                {
                                    (picture.type.map(type => {
                                        return (
                                            (type.id === currentPicture.typeId ?
                                                <option selected key={type.id} id={type.id}>{type.name}</option>
                                                :
                                                <option key={type.id} id={type.id}>{type.name}</option>
                                            )

                                        )
                                    }))
                                }
                            </select>
                        </article>
                        <article className="info-section_header">
                            <button className="modal-mainLayer_block-closeButton">close</button>
                            <button onClick={() => acceptLoadChanges()}>Внести изменения</button>
                            <input value={header} onChange={(e) => setHeader(e.target.value)}></input>
                        </article>
                        <section className="info-section_description">
                            <h1>DESCRIPTION</h1>
                            <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
                        </section>
                        <h2>ADD. INFO</h2>
                        {
                            (PictureInfo ?
                                PictureInfo.map(pictureI => {
                                    return (
                                        <section key={pictureI.id} className="info-section_addInfo">
                                            <input value={pictureI.title} onChange={(e) => changePictureInfo('title', e.target.value, pictureI.id)}></input>
                                            <input value={pictureI.description} onChange={(e) => changePictureInfo('description', e.target.value, pictureI.id)}></input>
                                            <button onClick={() => deletePictureInfo(pictureI)}>Удалить</button>
                                        </section>
                                    )
                                })
                                :
                                null
                            )
                        }
                        <section className="info-section_newAddInfo"> {/* ЗОЗДАНИЕ ДОПОЛНИТЕЛЬНЫХ ПАРАМЕТРОВ К КАРТИНКЕ */}
                            <button onClick={() => addNewPictureInfo()}>Добавить характеристику</button>
                            {
                                (newPictureInfo.map(info => {
                                    return (
                                        <section key={info.number} className="info-section_newAddInfo_block">
                                            <input value={info.title} onChange={(e) => changeNewPictureInfo('title', e.target.value, info.number)}></input>
                                            <input value={info.description} onChange={(e) => changeNewPictureInfo('description', e.target.value, info.number)}></input>
                                            <button onClick={() => deleteNewPictureInfo(info.number)}>Удалить</button>
                                        </section>
                                    )
                                }))
                            }
                        </section>
                        <h2>TAGS</h2>
                        <section className="info-section_tags">

                            {
                                (PictureTags ?
                                    PictureTags.map(tag => {
                                        return (
                                            <div>
                                                <input value={tag.text} key={tag.id} onChange={(e) => changePictureTag('text', e.target.value, tag.id)}></input>
                                                <button onClick={() => deletePictureTag(tag)}>Удалить</button>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                )
                            }
                            <section className="info-section_tags_newTags">
                                <button onClick={() => addNewPictureTag()}>Добавить тэг</button>
                                {
                                    (newPictureTags ?
                                        newPictureTags.map(tag => {
                                            return (
                                                <div>
                                                    <input value={tag.text} key={tag.number} onChange={(e) => changeNewPictureTag('text', e.target.value, tag.number)}></input>
                                                    <button onClick={() => deleteNewPictureTag(tag.number)}>Удалить</button>
                                                </div>
                                            )
                                        })
                                        :
                                        null
                                    )
                                }
                            </section>
                        </section>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PersonalPictureModalWindow;