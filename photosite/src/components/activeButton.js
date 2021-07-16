window.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('.sectionsMenu button');
    console.log(buttons);
    buttons.forEach((button, i)=>{
        button.addEventListener('click', function(e){
            if(window.innerWidth > 550){
                if(e.target.classList.contains('registerButton') == false && e.target.classList.contains('loginButton') == false){
                    console.log(e.target);
                    button.style.borderBottom = "solid black";
                    button.style.backgroundColor = "rgb(58, 89, 146)";
                    button.classList.add('active');
                    button.classList.remove('unactive');
                buttons.forEach((button, i)=>{
                    if(buttons[i] != e.target){
                        button.classList.remove('active');
                        button.classList.add('unactive');
                        button.style.borderBottom = "none";
                        button.style.backgroundColor = "rgb(75, 114, 187)";
                        }
                    });
                }        
            }else{
                if(e.target.classList.contains('registerButton') == false && e.target.classList.contains('loginButton') == false){
                        button.style.borderLeft = "solid white";
                        button.style.backgroundColor = "inherit";
                        button.classList.add('active');
                        button.classList.remove('unactive');
                    buttons.forEach((button, i)=>{
                        if(buttons[i] != e.target){
                        button.classList.remove('active');
                        button.classList.add('unactive');
                        button.style.borderLeft = "none";
                        button.style.backgroundColor = "inherit";
                        }
                    });
                }
                    
            }
            
            
        });
    });
    window.addEventListener('resize', function(){
        if(window.innerWidth>550){
            buttons.forEach((button, i)=>{
                if(buttons[i].classList.contains('active')){
                    button.style.borderBottom = "solid black";
                    button.style.backgroundColor = "rgb(58, 89, 146)";
                    button.style.borderLeft = "none";
                }
            });
        }else{
            buttons.forEach((button, i)=>{
                if(buttons[i].classList.contains('active')){
                    button.style.borderLeft = "solid white";
                    button.style.backgroundColor = "inherit";
                    button.style.borderBottom = "none";
                }
            });
        }
    });
});