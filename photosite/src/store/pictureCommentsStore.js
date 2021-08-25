import { makeAutoObservable } from "mobx"
export default class PictureCommentsStore {
    constructor() {
        this._pictureComments = [];
        makeAutoObservable(this);
    }
    setPictureComments(comments) {
        this._pictureComments = comments;
    }
    get pictureComments() {
        return this._pictureComments;
    }
}