let id = null;

function emphasise(){
    if (id == null){

        const headerText = document.getElementById("header-emphasise");
        let frameNum = 0;
    
        clearInterval(id);
        id = setInterval(frame, 100);
    
        function frame(){
            if (frameNum == 2) {
                clearInterval(id)
                id = null;
            } else if (frameNum == 0) {
                headerText.style.fontSize = '110px';
                headerText.style.color = 'rgba(255, 255, 255, 0.2)'
            } else {
                headerText.style.fontSize = '80px';
                headerText.style.color = 'white'
            }
            frameNum++;
            }
        }
}