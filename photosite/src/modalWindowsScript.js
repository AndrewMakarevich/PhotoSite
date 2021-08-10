function modalWindowsScript(){
    let registerButton = document.querySelector('.registerButton');
    let registerModalBackground = document.querySelector('.modalBackgroundReg');
    let closeRegModalButton = document.querySelector('.modalWindowReg .closeButtonReg');

    let loginButton = document.querySelector('.loginButton');
    let loginModalBackground = document.querySelector('.modalBackgroundLog');
    let closeLogModalButton = document.querySelector('.modalWindowLog .closeButtonLog');

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
            if(e.target === registerModalBackground){
                closeModal(registerModalBackground);
                
            }else{
                return;
            }
        });
        document.addEventListener('keydown', function(e){
            if(e.key === "Escape"){
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
            if(e.target === loginModalBackground){
                closeModal(loginModalBackground);
                
            }else{
                return;
            }
        });
        document.addEventListener('keydown', function(e){
            if(e.key === "Escape"){
                closeModal(loginModalBackground);
            }
        });
    });
    closeLogModalButton.addEventListener('click', function(){
        closeModal(loginModalBackground);
    });

};
export default modalWindowsScript;

