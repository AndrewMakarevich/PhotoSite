
function animateInput(input, label){
    const event = new Event('inputValueChange');
    input.addEventListener('inputValueChange',()=>{
        if(input.value){
            label.style.marginTop = "-25px";
        }else{
            label.style.marginTop = "";
        }
    });
    input.addEventListener('keydown', ()=>{
        input.dispatchEvent(event);
    });
    input.addEventListener('keyup', ()=>{
        input.dispatchEvent(event);
    });
}
function animatedInputs(){
    const authorizationInputs = document.querySelectorAll('.authorizationModalInput');
    authorizationInputs.forEach(inputBlock=>{
        animateInput(inputBlock.querySelector('input'), inputBlock.querySelector('label'));
    });
    // const nickNameInput = document.querySelector('.modalWindowReg-mainBlock-nickNameBlock input');
    // const nickNameLabel = document.querySelector('.modalWindowReg-mainBlock-nickNameBlock label');
    

    // const emailInput = document.querySelector('.modalWindowReg-mainBlock-emailBlock input');
    // const emailLabel = document.querySelector('.modalWindowReg-mainBlock-emailBlock label');
    // animateInput(emailInput, emailLabel);

    // const passwordInput = document.querySelector('.modalWindowReg-mainBlock-passwordBlock input');
    // const passwordLabel = document.querySelector('.modalWindowReg-mainBlock-passwordBlock label');
    // animateInput(passwordInput, passwordLabel);

    // const repPasswordInput = document.querySelector('.modalWindowReg-mainBlock-repPasswordBlock input');
    // const repPasswordLabel = document.querySelector('.modalWindowReg-mainBlock-repPasswordBlock label');
    // animateInput(repPasswordInput, repPasswordLabel);
}

export default animatedInputs;


