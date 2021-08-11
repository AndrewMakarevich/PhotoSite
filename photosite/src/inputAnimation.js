
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
}

export default animatedInputs;


