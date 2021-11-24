const audioElement = new Audio('../music.mp3');

const Reproductor = function(){
    this.audio = audioElement;
}

Reproductor.prototype.repro = function(){
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
}

Reproductor.prototype.init = function(){
    this.repro();
}