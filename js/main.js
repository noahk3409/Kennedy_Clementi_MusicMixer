console.log("JS file connected");

const elements = document.querySelectorAll(".draggable")

if(elements){
    for (let element of elements) {
        element.addEventListener("dragstart", dragstartHandler)
        element.addEventListener("dragend", dragendHandler)
    }
}

function dragstartHandler(ev) {
    console.log("drag was started")
}

function dragendHandler(ev) {
    console.log("drag was ended")
}
