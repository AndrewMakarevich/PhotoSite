import React, { useState, useEffect } from 'react';
import './addTypeModalWindow.css';

import { createType, getTypes, deleteTypes, changeType } from '../../http/typeAPI';

const AddTypeModalWindow = () => {
    const [type, setType] = useState('');
    const [types, setTypes] = useState('');
    const [changedTypes, setChangedTypes] = useState([]);
    console.log(types);
    console.log(changedTypes);

    const changeTypeFunction = (id, name, pictureId) => {
        setTypes(types.map(type => {
            if (type.id === id) {
                return { ...type, ['name']: name }
            }
            return type;
        }));
        let existence;
        for (let i = 0; i < changedTypes.length; i++) {
            if (changedTypes[i].id === id) {
                existence = true;
                break;
            } else {
                existence = false;
            }
        }
        if (existence) {
            setChangedTypes(changedTypes.map(type => {
                if (type.id === id) {
                    return { ...type, ['name']: name }
                }
                return type;
            }));
        } else {
            setChangedTypes([...changedTypes, { id, name, pictureId }]);
        }
    };
    const postChangedType = (id) => {
        let name;
        for (let i = 0; i < changedTypes.length; i++) {
            if (changedTypes[i].id === id) {
                name = changedTypes[i].name;
                break;
            } else {
                continue;
            }
        }
        changeType(id, name).then(data => alert(data)).catch((e) => alert(e));
    };

    const postType = async (name) => {
        try {
            if (type && type.length > 1 && !Number(type)) {
                const response = await createType(name);
                getTypesFunction();
                return alert(response.message);
            }
            alert('Тип введен неверно');
        } catch (e) {
            alert(e.response.data.message);
        }


    };

    const getTypesFunction = () => {
        getTypes().then(data => setTypes(data));
        return;
    };
    const deleteType = (id) => {
        deleteTypes(id).then(data => {
            alert(data.result);
            getTypesFunction();
        }).catch(e => alert(e.response.data.message));
        // const data = await deleteTypes(id);
        // alert(data.message);
        // getTypesFunction();
    };

    useEffect(() => {
        getTypesFunction();
    }, []);
    return (
        <div className="AddTypeModalWindow-mainLayer hidden">
            <div className="mainLayer-block">
                <button className="closeButton">Close</button>
                Добавить новый тип
                <input value={type} onChange={(e) => setType(e.target.value)}></input>
                <button
                    onClick={() => {
                        postType(type);
                    }
                    }>Добавить
                </button>
                <div className="mainLayer-block-tags">
                    {
                        (types ?
                            types.map(type => {
                                return (
                                    <div key={type.id} className="mainLayer-block-tags__tag">
                                        <button className="changeButton" onClick={() => postChangedType(type.id)}>Изменить</button>
                                        <input
                                            className="block-tags__tag-input"
                                            value={type.name}
                                            onChange={(e) => changeTypeFunction(type.id, e.target.value, type.pictureId)}
                                        >
                                        </input>
                                        <button className="deleteButton" onClick={() => deleteType(type.id)}>Удалить</button>
                                    </div>
                                )
                            })
                            :
                            <div>Типы загружаются</div>
                        )
                    }
                </div>

            </div>
        </div>
    )
};
export default AddTypeModalWindow;