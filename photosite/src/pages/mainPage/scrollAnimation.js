


function scrollAnimation(){
    document.addEventListener('scroll', ()=>{
        const aboutUsBlocks = document.querySelectorAll('.mainPagePagination-content-aboutUsBlock');
        const authorsBlocks= document.querySelectorAll('.content-second-author-content');
        aboutUsBlocks.forEach(block => {
            const reversedBlockHeight = -1 * block.offsetHeight;
            const blockCoordinats = block.getBoundingClientRect();
            if((blockCoordinats.y > reversedBlockHeight/2 && blockCoordinats.y < block.offsetHeight) || (blockCoordinats.y<900 && blockCoordinats.y>0)){
                block.style.transform ="translateX(0)";
            }else if(blockCoordinats.y > window.innerHeight || blockCoordinats.y < reversedBlockHeight){
                block.style.transform ="translateX(-100%)";
            }
        });
        authorsBlocks.forEach(block => {
            const reversedBlockHeight = -1 * block.offsetHeight;
            const blockCoordinats = block.getBoundingClientRect();
            if((blockCoordinats.y > reversedBlockHeight/2 && blockCoordinats.y < block.offsetHeight) || (blockCoordinats.y<900 && blockCoordinats.y>0)){
                block.style.opacity="1";
            }else if(blockCoordinats.y > window.innerHeight || blockCoordinats.y < reversedBlockHeight){
                block.style.opacity="0";
            }
        });
    });
}
export default scrollAnimation;