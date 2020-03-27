/**
 * vars store the interval id
 */
let vars = {
    moveBox: null, // initially it is null
    halfSecond: 500 // 1000 is one second, so 500 is half a second
};

/**
 * Creates a box on the page
 */
function addBox() {
    let playground = document.getElementById("playground"); // gets the playground element
    let box = document.createElement("div"); // creates a div element for the box
    box.id = "box"; // set the id of the box to be box
    playground.appendChild(box); // adds it to the playground element
}

/**
 * Remove the box from the playground
 */
function removeBox() {
    let playground = document.getElementById("playground"); // gets the playground element
    let box = document.getElementById("box"); // gets the box
    if (box) {// if the box does exist
        playground.removeChild(box); // removes the box from the playground
    }
}

/**
 * Change the position of the box
 * @param {number} time the time (sec) it makes two jumps
 */
function changePos(time) {
    let direction = 1; // initially the box is at the left side
    let box = document.getElementById('box'); // gets the box element
    clearInterval(vars.moveBox); // clear previous setting of the time
    if (time !== 0) { // if a time has been set
        vars.moveBox = setInterval(function() { // sets the interval
            if (direction === 1) { // if we are at the left side
                direction = -1; // sets the side to be right
                box.style.float = "right"; // float to the right
            } else { // if we are at the right side
                direction = 1; // sets the side to be left
                box.style.float = "left"; // float to the left
            }
        }, time * vars.halfSecond); // makes a jump every half of the period
    }
}

/**
 * Start the process
 */
function myStart() {
    let box = document.getElementById("box"); // gets the box element
    if (!box) { // if we cannot find the box elmeent
        addBox(); // creates the box
    }
    let time = 0; // the default time is 0
    let temp = document.getElementById("period").value.trim(); // gets the period
    time = temp.length === 0 ? time : Number(temp); // sets the time
    changePos(time); // changes the position of the box
}


/**
 * Ends the process
 */
function myStop() {
    removeBox(); // removes the box from the playground.
}