function animateInput(input,label){
    const inputValueChanging = new Event('inputValueChange');
    input.addEventListener('inputValueChange', ()=>{
        if(input.value){
            label.style.marginTop = "-25px";
        }else{
            label.style.marginTop = "'";
        }
    });
    input.addEventListener('keydown', ()=>{
        input.dispatchEvent(inputValueChanging);
    });
    input.addEventListener('keyup', ()=>{
        input.dispatchEvent(inputValueChanging);
    });
    input.addEventListener('click', ()=>{
        input.dispatchEvent(inputValueChanging);
    });
}

function inputAnimation(){
    const inputs = document.querySelectorAll('.personalCabModal-block .personalCabModalInput');
    const selector = document.querySelector('.personalCabModal-block .personalCabModalInput-select');
    animateInput(selector.querySelector('select'), selector.querySelector('label'));
    inputs.forEach(input => {
        animateInput(input.querySelector('input'), input.querySelector('label'));
    });
}
export default inputAnimation;