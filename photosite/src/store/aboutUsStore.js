import { makeAutoObservable } from "mobx";

const textSample1 ='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose';

const textSample2='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.';

const textSample3='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.';

export default class AboutUsStore{
    
    constructor(){
        this._header=[
            {
                visibleHeaderH1: "FIRST HEADER",
                visibleHeaderAddText:"Some text for the first header",
                hiddenHeaderH1:"FIRST HIDDEN HEADER",
                hiddenHeaderAddText:"FIRST HIDDEN ADD. TEXT",
                text: textSample1
            },
            {
                visibleHeaderH1: "SECOND HEADER",
                visibleHeaderAddText:"Some text for the second header",
                hiddenHeaderH1:"SECOND HIDDEN HEADER",
                hiddenHeaderAddText:"SECOND HIDDEN ADD. TEXT",
                text: textSample2
            },
            {
                visibleHeaderH1: "THIRD HEADER",
                visibleHeaderAddText:"Some text for the third header",
                hiddenHeaderH1:"THIRD HIDDEN HEADER",
                hiddenHeaderAddText:"THIRD HIDDEN ADD. TEXT",
                text: textSample3
            }
        ];
        this._authorInfo=[
            {
                header: 'TEST HEADER',
                firstColumnText:textSample1,
                secondColumnText:textSample2,
                contacts:{
                    vk: "https://vk.com/im",
                    instagram: "https://www.instagram.com/",
                    linkedIn: "https://www.linkedin.com/jobs/",
                    twitter: "https://twitter.com/?lang=ru",
                    youTube: "https://www.youtube.com/watch?v=NGnghjjgCpY&ab_channel=%D0%9B%D1%83%D1%87%D1%88%D0%B5%D0%B5%D1%81%D0%9F%D0%B0%D0%BF%D0%B8%D1%87%D0%B5%D0%BC",
                },
                avatar: "https://yt3.ggpht.com/ytc/AAUvwniMIzO6EFPmTV6dqspznI9v11ooroG5RD9nM0VI=s900-c-k-c0x00ffffff-no-rj",
                fullName:"Andrew Makarevich"
            },
            {
                header: 'TEST HEADER',
                firstColumnText:textSample1,
                secondColumnText:textSample2,
                contacts:{
                    vk: "https://vk.com/im",
                    instagram: "https://www.instagram.com/",
                    linkedIn: "https://www.linkedin.com/jobs/",
                    twitter: "https://twitter.com/?lang=ru",
                    youTube: "https://www.youtube.com/watch?v=NGnghjjgCpY&ab_channel=%D0%9B%D1%83%D1%87%D1%88%D0%B5%D0%B5%D1%81%D0%9F%D0%B0%D0%BF%D0%B8%D1%87%D0%B5%D0%BC",
                },
                avatar: "https://yt3.ggpht.com/ytc/AAUvwniMIzO6EFPmTV6dqspznI9v11ooroG5RD9nM0VI=s900-c-k-c0x00ffffff-no-rj",
                fullName:"Andrew Makarevich"
            }
        ];
        makeAutoObservable(this);
    }

    setHeader(text){
        this._header = text;
    }
    setAuthorInfo(info){
        this._authorInfo= info;
    }

    get header(){
        return this._header;
    }
    get authorInfo(){
        return this._authorInfo;
    }
}