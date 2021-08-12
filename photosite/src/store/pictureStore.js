import { makeAutoObservable } from "mobx";

export default class PictureStore{
    constructor(){
        this._type = [
            {
                id: "1",
                name: "Картина"
            },
            {
                id: "2",
                name: "Фотография"
            },
            {
                id: "3",
                name: "Арт"
            },
        ];
        this._selectedType = {};
        this._pictures= [
            // {
            //     id:"1",
            //     header:"Davinci's art",
            //     description:"Mona Lisa Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.Mona Lisa Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
            //     img:"https://wallpaperaccess.com/full/1115339.jpg"
            // },
            // {
            //     id:"2",
            //     header:"Davinci's art",
            //     description:"Lady with an Ermine",
            //     img:"https://cdn.britannica.com/q:60/46/198846-050-82EE84FC/Lady-Ermine-oil-panel-Leonardo-da-Vinci.jpg"
            // },
            // {
            //     id:"3",
            //     header:"Davinci's art",
            //     description:"Self Portrait",
            //     img:"https://cdn.britannica.com/q:60/75/115475-050-9F9B00CE/Self-portrait-drawing-Leonardo-da-Vinci-Royal-Library.jpg"
            // },
            // {
            //     id:"4",
            //     header:"Aivazovski's art",
            //     description:"Ninth Wave",
            //     img:"https://ar.culture.ru/attachments/attachment/preview/5d712dd8b5069c3d4f32d291-preview.jpg"
            // },
            // {
            //     id:"5",
            //     header:"Aivazovski's art",
            //     description:"Sea at night",
            //     img:"https://ar.culture.ru/attachments/attachment/preview/5d5310793bdc866a576e3eae-preview.jpg"
            // },
            // {
            //     id:"6",
            //     header:"Aivazovski's art",
            //     description:"Chessme battle",
            //     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chesmabattle.jpg/1200px-Chesmabattle.jpg"
            // },
        ];
        
        makeAutoObservable(this);
    }
    setType(type){
        this._type = type;
    }
    setSelectedType(selectedType){
        this._selectedType = selectedType;
    }
    setPictures(pictures){
        this._pictures = pictures;
    }

    get type(){
        return this._type;
    }
    get selectedType(){
        return this._selectedType;
    }
    get pictures(){
        return this._pictures;
    }
}