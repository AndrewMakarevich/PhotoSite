// 
// //     if(window.location.href.includes('/personalcabinet')==false && window.location.href.includes('/admincabinet')==false){
        // window.addEventListener('DOMContentLoaded', function(){
            function AnimateSlider(number=1){
                    if(number == 0){
                        return;
                    }
                    let pictures = document.querySelectorAll('.mainPageContent img'); 
                    let slider = [];
                    if(pictures){
                        console.log("WTF");
                        for( let i = 0; i<pictures.length; i++){
                            slider[i] = pictures[i].src;
                            console.log(slider[i]);
                            pictures[i].remove();
                        }

                        let step=0;
                        let offset = 0;
                        function draw(){
                            let mainContentBlock = document.querySelector('.mainPageContent');
                            let img = document.createElement('img');
                            img.src = slider[step];
                            img.style.left = offset*(window.innerWidth - window.innerWidth*0.05) +'px';
                            mainContentBlock.appendChild(img);
                            
                            if(step+1 == slider.length){
                                step = 0;
                            }else{
                            step++;  
                            }
                            offset=1;
                        }
                        function left(){
                            let offset2 = 0;
                            let currentSlides = document.querySelectorAll('.mainPageContent img');
                            for(let i =0; i < currentSlides.length; i++){
                                currentSlides[i].style.left = offset2*(window.innerWidth - window.innerWidth*0.05) - (window.innerWidth - window.innerWidth*0.05)+'px';
                                offset2++;
                            }
                            setTimeout(function(){
                                currentSlides[0].remove();
                            }, 500);
                        }
                        draw();
                        draw();
                        setInterval(function(){
                            console.log(window.innerWidth);
                            left();
                            draw();
                        }, 1000);
                        
                    }
            
            }
            
    //   }); 
    
    export default AnimateSlider;

        