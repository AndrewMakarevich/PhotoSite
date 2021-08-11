



function AnimateSlider() {
    let changeApiEvent = new Event('changedApi');
    let currentPosition = window.location.href;
    let pictures = document.querySelectorAll('.mainPageContent img');
    let infoBlocks = document.querySelectorAll('.mainPageContent .backgroundAddInfo');
    let infoSlider = [];
    let slider = [];
    let step = 0;
    let offset = 0;

    if (pictures && infoBlocks) {
        for (let i = 0; i < pictures.length; i++) {
            slider[i] = pictures[i].src;
            infoSlider[i] = infoBlocks[i].innerHTML;
            infoBlocks[i].remove();
            pictures[i].remove();
        }


        let mainContentBlock = document.querySelector('.mainPageContent');

        function draw() {           
            // CREATION OF INFO BLOCK
            let div = document.createElement('div');
            div.innerHTML = infoSlider[step];
            div.classList.add('backgroundAddInfo');
            div.id = step;
            div.style.top = offset * mainContentBlock.clientHeight+'px';
            mainContentBlock.appendChild(div);

            // CREATION OF IMAGE
            let img = document.createElement('img');
            img.src = slider[step];
            img.style.left = offset * window.innerWidth + 'px';
            mainContentBlock.appendChild(img);


            if (step + 1 === slider.length) {
                step = 0;
            } else {
                step++;
            }
            offset = 1;
        }
        function left() {
            let offset2 = 0;
            let currentSlides = document.querySelectorAll('.mainPageContent img');
            for (let i = 0; i < currentSlides.length; i++) {
                currentSlides[i].style.left = offset2 * window.innerWidth - window.innerWidth + 'px';
                offset2++;
            }
            setTimeout(function () {
                currentSlides[0].remove();
            }, 2000);
        }
        function top(){
            let offset2 = 0;
            let currentInfoBlocks = document.querySelectorAll('.mainPageContent .backgroundAddInfo');
            for (let i = 0; i< currentInfoBlocks.length; i++){
                currentInfoBlocks[i].style.top = offset2 * mainContentBlock.clientHeight - mainContentBlock.clientHeight+'px';
                offset2++;
            }
            setTimeout(function () {
                currentInfoBlocks[0].remove();
            }, 2000);
        }
        draw();
        draw();

        function createSlider() {
            left();
            top();
            draw();
        }
        // АНИМАЦИЯ СЛАЙДЕРА

        let sliderAnimation = setInterval(function () {
            currentPosition = window.location.href;
            if (currentPosition !== 'http://localhost:3000/') {
                window.dispatchEvent(changeApiEvent);
                return;
            }
            return createSlider();
        }, 4000);

        // ФУНКЦИЯ ПОСТАНОВКИ АНИМАЦИИ НА ПАУЗУ ПРИ НАВЕДЕНИИ НА СЛАЙДЕР

        mainContentBlock.addEventListener('mouseover', () => {
            document.querySelector('.mainPageContent-icons').style.right  ="60px";
            clearInterval(sliderAnimation);
        });
        mainContentBlock.addEventListener('mouseout', () => {
                    document.querySelector('.mainPageContent-icons').style.right  = "-60px";
                    sliderAnimation = setInterval(function () {
                        currentPosition = window.location.href;
                        if (currentPosition !== 'http://localhost:3000/') {
                            window.dispatchEvent(changeApiEvent);
                            return;
                        }
                        return createSlider();
                    }, 4000);
        });

        // ФИКСИРОВАНИЕ ИЗМЕНЕНИЯ API И ПРИОСТАНОВЛЕНИЕ РАБОТЫ СКРИПТА
        window.addEventListener('changedApi', function () {
            clearInterval(sliderAnimation);
            return;
        });

        window.addEventListener('click', function () {
            currentPosition = window.location.href;
            if (currentPosition !== 'http://localhost:3000/') {
                window.dispatchEvent(changeApiEvent);
                return;
            }
        });
    }

}


export default AnimateSlider;

        