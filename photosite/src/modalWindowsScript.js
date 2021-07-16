window.addEventListener('DOMContentLoaded', function(){
    let registerButton = document.querySelector('.registerButton');
    let registerModalBackground = document.querySelector('.modalBackgroundReg');
    let closeRegModalButton = document.querySelector('.modalWindowReg .closeButtonReg');
    let regModalWindow = document.querySelector('.modalWindowReg');

    let loginButton = document.querySelector('.loginButton');
    let loginModalBackground = document.querySelector('.modalBackgroundLog');
    let closeLogModalButton = document.querySelector('.modalWindowLog .closeButtonLog');
    let logModalWindow = document.querySelector('.modalWindowLog');

    const openModal = (modal) =>{
        modal.classList.add('opened');
        modal.classList.remove('hidden');
    };
    const closeModal = (modal) =>{
        modal.classList.add('hidden');
        modal.classList.remove('opened');
    };  
    registerButton.addEventListener('click', function(){
        openModal(registerModalBackground);
        registerModalBackground.addEventListener('click', function(e){
            if(e.target == regModalWindow){
                return;
            }else{
                closeModal(registerModalBackground);
            }
        });
        document.addEventListener('keydown', function(e){
            if(e.key == "Escape"){
                closeModal(registerModalBackground);
            }
        });
    });
    closeRegModalButton.addEventListener('click', function(){
        closeModal(registerModalBackground);
    });

    loginButton.addEventListener('click', function(){
        openModal(loginModalBackground);
        loginModalBackground.addEventListener('click', function(e){
            if(e.target == logModalWindow){
                return;
            }else{
                closeModal(loginModalBackground);
            }
        });
        document.addEventListener('keydown', function(e){
            if(e.key == "Escape"){
                closeModal(loginModalBackground);
            }
        });
    });
    closeLogModalButton.addEventListener('click', function(){
        closeModal(loginModalBackground);
    });

});

