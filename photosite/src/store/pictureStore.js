import { makeAutoObservable } from "mobx";

export default class PictureStore {
    constructor() {
        this._type = [

        ];
        this._selectedType = {};
        this._pictures = [

        ];

        makeAutoObservable(this);
    }
    setType(type) {
        this._type = type;
    }
    setSelectedType(selectedType) {
        this._selectedType = selectedType;
    }
    setPictures(pictures) {
        this._pictures = pictures;
    }

    get type() {
        return this._type;
    }
    get selectedType() {
        return this._selectedType;
    }
    get pictures() {
        return this._pictures;
    }
}