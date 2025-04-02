console.log("JS file connected");

// Music Mixer plan

//Goal: A 90s hip-hop themed drag-and-drop music mixer.

//Created a layout structure.

//Chose a color scheme and background images to match the hip-hop graffiti theme.

//Set up a basic HTML structure.

//Linked CSS (main.css) and JavaScript (main.js) files.

//Styled the page with CSS, adding a background image and styling the instrument list.

//Implemented a drag and drop feature in JavaScript with event listeners for dragstart, dragover, and drop events.

//Added audio files to allow for playback when drag and dropping onto boombox.

//Added volume slider in HTML and JavaScript, adjusting it position in CSS to allow for volume control. 

//Testing and debugging for correct audio playback, drag and drop, volume control, and animation responsiveness.

//Validated HTML and CSS to debug. 

//Finished


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


