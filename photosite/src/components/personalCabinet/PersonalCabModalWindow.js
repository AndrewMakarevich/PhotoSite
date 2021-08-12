import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import './PersonalCabModalWindow.css';
import inputAnimation from './personalCabModalInputAnimation';
import getOptionsInfo from './getOptionsInfo';
import { Context } from '../../index';
import { createPicture } from '../../http/pictureAPI';
import { getTypes } from '../../http/typeAPI';

const PersonalCabModalWindow = observer(() => {
    const { picture } = useContext(Context);
    // PICTURES STATES
    const [PictureInfo, setPictureInfo] = useState([]);
    const [PictureTags, setPictureTags] = useState([]);
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(15);
    const [img, setImg] = useState(null);


    const addPictureInfo = () => {
        setPictureInfo([...PictureInfo, { title: "", description: "", number: Date.now() }]);
    };
    const addPictureTag = () => {
        setPictureTags([...PictureTags, { text: "", number: Date.now() }]);
    };
    const deletePictureInfo = (number) => {
        setPictureInfo(PictureInfo.filter(i => i.number !== number));
    };
    const deletePictureTag = (number) => {
        setPictureTags(PictureTags.filter(i => i.number !== number));
    };
    useEffect(() => {
        inputAnimation();
        getTypes().then(data => picture.setType(data));
    }, []);
    const changePictureInfo = (key, value, number) => {
        setPictureInfo(PictureInfo.map(info => {
            if (info.number === number) {
                return { ...info, [key]: value }
            }
            return info;
        }));
    };
    const changePictureTags = (key, value, number) => {
        setPictureTags(PictureTags.map(tag => {
            if (tag.number === number) {
                return { ...tag, [key]: value }
            }
            return tag;
        }));
    };

    // ФУНКЦИЯ СОЗДАНИЯ КАРТИНКИ
    const createAndSendPicture = async () => {
        const formData = new FormData();
        formData.append('header', header);
        formData.append('description', description);
        formData.append('typeId', type);
        formData.append('img', img);
        formData.append('info', JSON.stringify(PictureInfo));
        formData.append('tags', JSON.stringify(PictureTags));
        console.log(formData);
        const response = await createPicture(formData);
        return alert(response);
    };
    return (
        <div className="personalCabModal hidden">
            <div className="personalCabModal-block">
                <div className="personalCabModalInput">
                    <input onChange={(e) => setHeader(e.target.value)}></input>
                    <label>Header</label>
                </div>
                <div className="personalCabModalInput">
                    <input onChange={(e) => setDescription(e.target.value)}></input>
                    <label>Description</label>
                </div>
                <div className="personalCabModalInput-select">
                    <select onChange={(e) => setType(getOptionsInfo(e.target, e.target.selectedIndex))}>
                        <option ></option>
                        {picture.type.map(type => {
                            return (
                                <option id={type.id} key={type.id}>{type.name}</option>
                            )
                        })}
                    </select>
                    <label>Type</label>
                </div>
                <div>
                    <input type="file" onChange={(e) => setImg(e.target.files[0])}></input>
                </div>
                <button onClick={addPictureInfo}>Добавить параметр</button>
                <div>
                    {
                        PictureInfo.map(info => {
                            return (
                                <div key={info.number}>
                                    <input placeholder="введите заголовок" onChange={(e) => changePictureInfo('title', e.target.value, info.number)}></input>
                                    <input placeholder="введите описание" onChange={(e) => changePictureInfo('description', e.target.value, info.number)}></input>
                                    <button onClick={() => deletePictureInfo(info.number)}>Удалить</button>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => addPictureTag()}>Добавить тэг</button>
                <div>
                    {
                        PictureTags.map(tag => {
                            return (
                                <div key={tag.number}>
                                    <input placeholder="введите тэг" onChange={(e) => changePictureTags('text', e.target.value, tag.number)}></input>
                                    <button onClick={() => deletePictureTag(tag.number)}>Удалить</button>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={() => createAndSendPicture()}>Отправить</button>
                <button className="personalCabModal-closeBtn">Close</button>
            </div>
        </div>
    )
});

export default PersonalCabModalWindow;