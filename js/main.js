console.log("JS file connected");

const instruments = document.querySelectorAll(".draggable");
const dropzone = document.querySelector(".boombox");
let draggedPiece;
let activeAudioElements = [];

function startedDragging() {
    console.log("dragstart called");
    draggedPiece = this;
}


function draggedOver(e) {
    console.log("dragover called");
    e.preventDefault();
}

function dropped(e) {
    console.log("drop called");
    e.preventDefault();
    this.appendChild(draggedPiece);

    draggedPiece.style.display = 'none';

    stopAllAudio();
    playAllAudioInDropzone();


    const boombox = document.querySelector('.boombox');
    if (boombox) {
        boombox.classList.add('boombox-pulse'); 
    }
}

function stopAllAudio() {
    activeAudioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    activeAudioElements = [];
}

function playAllAudioInDropzone() {

    const instrumentsInDropzone = dropzone.querySelectorAll('.draggable');
    
    instrumentsInDropzone.forEach(instrument => {
        const audio = document.createElement('audio');
        audio.src = `audio/${instrument.id}.mp3`;
        audio.loop = true;
        dropzone.appendChild(audio);
        audio.play();
        activeAudioElements.push(audio);
    });
}


let volume = document.querySelector("#volume-slider");
volume.addEventListener("input", function (e) {
    let volumeLevel = e.target.value / 100; 
    activeAudioElements.forEach(audio => {
        audio.volume = volumeLevel;
    });
});


// Event listeners
instruments.forEach(instrument => {
    instrument.addEventListener('dragstart', startedDragging);
});
dropzone.addEventListener('dragover', draggedOver);
dropzone.addEventListener('drop', dropped);


