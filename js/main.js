console.log("JS file connected");

const instruments = document.querySelectorAll(".draggable");
const dropzone = document.querySelector(".boombox");

instruments.forEach(instrument => {
    instrument.addEventListener("dragstart", (e) => {
console.log("drag was started")
        e.dataTransfer.setData("text/plain", e.target.getAttribute("id"));
    });

instrument.addEventListener("dragover", (e) => {
console.log("drag was ended")
});
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allows dropping inside boombox
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    const instrumentId = e.dataTransfer.getData("text/plain");
    
    if (!instrumentId) return; // Prevent invalid queries
    
    const instrument = document.querySelector(`[id='${instrumentId}']`);
    
    if (instrument) {
        let clone = instrument.cloneNode(true);
        clone.classList.remove("draggable"); // Prevent re-dragging
        clone.style.position = "absolute";
        clone.style.left = `${e.clientX - dropzone.offsetLeft}px`;
        clone.style.top = `${e.clientY - dropzone.offsetTop}px`;
        dropzone.appendChild(clone);
        
        playSound(instrumentId);
    }
});

function playSound(instrumentId) {
    let audio = new Audio(`sounds/${instrumentId}.mp3`);
    audio.play().catch(error => console.error("Audio playback failed", error));
}