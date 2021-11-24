const audioElement = new Audio('../music.mp3');

const ReproductorObj = {

    repro: function(){
        const botonPlay = document.getElementById("play");
        botonPlay.addEventListener("click", ()=>{
            
            if (audioElement.paused){
                audioElement.play();
                console.log('Enjoy it');
    
            }else{
                audioElement.pause();
                console.log('Pause!');
            }
            
        });
    },
    
    init: function(){
        this.repro();
    }

}

