function animateHeader(){
    const header = document.querySelector('.mainPageBodyHeader');
    const headerText = document.querySelectorAll('.mainPageBodyHeader div');

    if(header && headerText){
        header.addEventListener('mousemove', function(e){
            headerText.forEach((headerText,i) => {
                if(i%2==0){
                    if(i==0){
                        headerText.style.transform = `translateX(${-1*e.clientX*(0.5/100)}px)`;
                    }else{
                        headerText.style.transform = `translateX(${-1*e.clientX*(i/100)}px)`;
                    }
                    
                }else{
                    headerText.style.transform = `translateX(${e.clientX*(i/100)}px)`; 
                }
            });
            
        });
    }
}
export default animateHeader;