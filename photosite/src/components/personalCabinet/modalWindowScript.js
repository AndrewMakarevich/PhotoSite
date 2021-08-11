function toggleModalScript(){
    const modal = document.querySelector('.personalCabModal');
    const closeButton = document.querySelector('.personalCabModal-closeBtn');
    const openButton = document.querySelector('.openPersonalCabModalBtn');
    closeButton.addEventListener('click', ()=>{
        modal.classList.add('hidden');
    });
    openButton.addEventListener('click', ()=>{
        modal.classList.remove('hidden');
        document.addEventListener('keydown',(e)=>{
            if(e.key === "Escape"){
                modal.classList.add('hidden');
            }
        });
        modal.addEventListener('click',(e)=>{
            if(e.target.className === "personalCabModal"){
                modal.classList.add('hidden');
            }            
        });
    });
}
export default toggleModalScript;