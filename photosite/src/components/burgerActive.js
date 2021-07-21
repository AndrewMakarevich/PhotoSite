window.addEventListener('DOMContentLoaded', function(){
    let active = false;
    const burgerIcon  = document.querySelector('.burgerMenuIcon');

    const lines = burgerIcon.querySelectorAll('span');

    const sections = document.querySelector('.sectionsMenu');

    const sectionsMenu = document.querySelectorAll('.sectionsMenu button');

    const appBar  = document.querySelector('.AppBar');
    if(burgerIcon){
        burgerIcon.addEventListener('click', function(){
            if(active === false){
                active = true;
                lines[0].style.animation = "burgerAnimationFirstLine 1 .1s forwards";
                lines[1].style.opacity = "0";
                lines[2].style.animation = "burgerAnimationThirdLine 1 .1s forwards";
                appBar.style.height = "220px";
                sections.style.transform = "translateX(10px)";
                sectionsMenu.forEach(section =>{
                    section.style.display="block";
                });
            }else{
                active = false;
                lines[0].style.animation = "none";
                lines[1].style.opacity = "1";
                lines[2].style.animation = "none";
                sectionsMenu.forEach(section =>{
                    section.style.display="none";
                });
                appBar.style.height = "45px";
                sections.style.transform = "translateX(-150px)";
            }
            
        });
        window.addEventListener('resize', function(){
            if(window.innerWidth>550){
                sectionsMenu.forEach(section =>{
                    section.style.display="";
                    appBar.style.height = "55px";
                    
                });
                active = false;
                lines[0].style.animation = "none";
                lines[1].style.opacity = "1";
                lines[2].style.animation = "none";
            }else{
                sectionsMenu.forEach(section =>{
                    appBar.style.height = "45px";
                    section.style.display="none";
                });
            }
        });
        document.addEventListener('click', function(e){
            if(e.target != appBar && e.target != sections 
                && e.target != burgerIcon && e.target != lines[0]
                 && e.target != lines[1] && e.target != lines[2]
                  && e.target.parentElement!=sections){
                if(active==true){
                    active = false;
                    lines[0].style.animation = "none";
                    lines[1].style.opacity = "1";
                    lines[2].style.animation = "none";
                    sectionsMenu.forEach(section =>{
                        section.style.display="none";
                    });
                    appBar.style.height = "45px";
                    console.log(e.target);
                }
            }
        });
    }
});