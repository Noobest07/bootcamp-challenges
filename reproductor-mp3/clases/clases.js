const audioElement = new Audio('../music.mp3');

class Reproductor {
    constructor() {
        this.audio = audioElement;
    }
    repro() {
        const botonPlay = document.getElementById("play");

        botonPlay.addEventListener("click", () => {

            if (audioElement.paused) {
                audioElement.play();
                console.log('Enjoy it');

            } else {
                audioElement.pause();
                console.log('Pause!');
            }

        });
    }
    init() {
        this.repro();
    }
}


