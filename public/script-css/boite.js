$(document).ready(function() {
    setInterval(() => {
            
    }, 1000);

    var contentform = document.querySelectorAll(".ui-splash-content-display-messages-tips-heure");
    var heureform = document.querySelectorAll(".ui-splash-content-display-messages-tips-heure-form");
    var glops = document.querySelectorAll(".ui-splash-content-display-messages-global-tips");

    for(let x = 0; x < contentform.length; i++){
        if(contentform[x].clientHeight  > 40 || ((contentform[x].clientWidth + heureform[x].clientWidth) > (glops[x].clientWidth - 3))){
            console.log(contentform[x].innerHTML[10]);
            let taille = ( window.innerWidth * 8.5 ) / 100;
            console.log("lataille : " + taille);
            let inc  = '';
            for(let i = 0; i < taille - 5 ; i++){
                inc += contentform[x].innerHTML[i]; 
            }
            inc += '...';
            contentform[x].innerHTML = inc; 
            
        }
    }
    
   
    /*
    contentform[0].clientWidth + heureform[1].clientWidth) >= window.innerWidth
    console.log("Taille écran: " + window.innerWidth);
        console.log("Taille message: " + contentform[0].clientWidth);
        console.log("Taille date: " + heureform[1].clientWidth);
        console.log("calcul: " + (contentform[0].clientWidth + heureform[1].clientWidth));
        console.log(window.innerWidth - contentform[0].clientWidth);
     */
    
    
    
});