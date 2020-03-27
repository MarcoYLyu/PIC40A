/**
 * vals acts as a namespace for constant properties
 */
const vals = {
    TEXTFILE : "important.txt",
    SPEEDNAME: "Speed",
    COLORS: ["red", "yellow", "blue"],
    NUM_OF_BUTTONS: 50,
    NUM_OF_BUTTONS_PER_LINE: 10,
    SPEED_FACTOR: 10.0
};

/**
 * boxProperties acts as a namespace for box properties.
 */
let boxProperties = {
    direction : 1,
    boxWidth: 200
};

/**
 * Takes in the username, determines what the speed and color,
 * and makes cookies accordingly.
 * @param {string} name The name the user enters
 * 
 * @return void
 */
function makeCookie(name) {
    let speed = 0; // default speed is 0
    let color = "red"; // default color is red
    for (let i = 0; i <= vals.NUM_OF_BUTTONS; i += 1) { 
        // searches all speed buttons
        if (document.getElementById("Speed-" + i).checked) { 
            // checks if the button is selected
            speed = i; // assigns the value of the button to speed
            break; // breaks the loop
        }
    }
    for (let colorItr of vals.COLORS) { // searches all colors buttons
        if (document.getElementById("color-" + colorItr).checked) { // checks if the button is selected
            color = colorItr; // assigns the value to color
            break; // breaks the loop
        }
    }
    let expires = new Date(); // gets the current time
    expires.setSeconds(expires.getSeconds() + 10); // the cookie expires after 10s.
    document.cookie = `name=${name}; expires=${expires.toUTCString()}; path=/`; // makes the cookie for name
    document.cookie = `speed=${speed}; expires=${expires.toUTCString()}; path=/`; // makes the cookie for speed
    document.cookie = `color=${color}; expires=${expires.toUTCString()}; path=/`; // makes the cookie for color
}

/**
 * Returns an HTML label element.
 * @param {string} labelName <label for="{labelName}"></label>
 * @param {number} i the index of the button
 * 
 * @return {object} the label Element
 */
function createLabel(labelName, i = -1) {
    let label = document.createElement("label"); // creates a label element
    label.setAttribute("for", labelName); // sets the for attribute for this label element
    if (i !== -1) { 
        // the index is specified.
        label.appendChild(document.createTextNode(labelName + " " + i)); // labelName i (i.e., Speed 2)
    } else { 
        // no indices is specified.
        label.appendChild(document.createTextNode(labelName)); // labelName (i.e., red)
    }
    return label; // returns the label element
}

/**
 * Returns a button element whose attributes are type, value, and name.
 * @param {string} buttonType the type of the button (i.e., radio)
 * @param {string} buttonName the name of the button (i.e., color / speed)
 * @param {*} val the value of the button (i.e., red / 1)
 */
function createButton(buttonType, buttonName, val) {
    let button = document.createElement("input"); // creates a input element
    button.setAttribute("type", buttonType); // set the type of the button
    button.setAttribute("value", val);  // set the value of the button
    button.setAttribute("name", buttonName); // set the name of the button
    button.id = buttonName + "-" + val; // set the id of the button (i.e., color-red)
    return button; // returns the button Element
}

/**
 * returns the fieldset element containing all speed labels and buttons.
 * @param {number} cookieSpeed the speed read from the cookie.
 * 
 * @return {object} a fieldset element.
 */
function createSpeedController(cookieSpeed) {
    let fieldset1 = document.createElement("fieldset"); // creates a fieldset element
    for (let i = 0; i <= vals.NUM_OF_BUTTONS; i += 1) { 
        // iterates through all possible buttons
        let label = createLabel(vals.SPEEDNAME, i); // creates the label for each button
        let radioButton = createButton("radio", vals.SPEEDNAME, i); // creates the button

        if (i === cookieSpeed) { 
            // checks whether it matches the one read from cookie
            radioButton.checked = true; // continues checking this button
        } else {
            if (i === 0) { 
                // the default option
                radioButton.checked = true; // checks this button
            }
        }

        fieldset1.appendChild(label); // adds the label element to fieldset
        fieldset1.appendChild(radioButton); // adds the button element to fieldset
        if (i % vals.NUM_OF_BUTTONS_PER_LINE === 0) { 
            // checks whether it reaches the end of a line
            fieldset1.appendChild(document.createElement("br")); // new lines
        }
    }
    return fieldset1; // returns the fieldset element
}

/**
 * Returns the label and button created for color elements.
 * @param {string} colorName the name of the color (i.e., red)
 * @param {string} cookieColor the color read from cookie
 * 
 * @return {array} an array containing the label and button.
 */
function createColorHelper(colorName, cookieColor) {
    let label = createLabel(colorName); // creates the label for the specified color
    let button = createButton("radio", "color", colorName); // creates the button
    if (colorName === cookieColor) { 
        // the color is the same as the one in the cookie
        button.setAttribute("checked", true); // check this color
    } else {
        if (colorName === "red") { 
            // the default color is red
            button.setAttribute("checked", true); // check this color
        }
    }
    return [label, button]; // return the array
}

/**
 * Returns a fieldset element containing the labels and buttons.
 * @param {string} cookieColor the color from the cookie
 * 
 * @return {object} a fieldset Element
 */
function createColorController(cookieColor) {
    let fieldset2 = document.createElement("fieldset"); // creates a fieldset element
    for (let color of vals.COLORS) { 
        // iterates through all possible colors (red, yellow, blue)
        let temp = createColorHelper(color, cookieColor); // stores the label and color in an array
        fieldset2.appendChild(temp[0]); // sets the first child to be the label
        fieldset2.appendChild(temp[1]); // set sthe second child to be the button
    }
    return fieldset2; // returns the color.
}

/**
 * Returns the div element containing the animation
 * @param {string} name the username
 * 
 * @return {object} the div Element
 */
function createPlayground(name) {
    let playground = document.createElement("div"); // creates a div element for the playground
    let box = document.createElement("div"); // creates a div element for the colored rectangle
    let welcomeMessage = document.createElement("p"); // creates a paragraph element
    welcomeMessage.id = "welcome"; // sets the id for welcomeMessage
    welcomeMessage.appendChild(document.createTextNode("Welcome " + name)); // adds the welcome message
    box.id = "box"; // sets the id for the box

    // playground properties
    playground.id = "playground"; // sets the id for the playground
    playground.style.backgroundColor = "grey"; // sets the background color for the playground
    playground.style.height = "300px"; // sets the height of the playground
    playground.style.position = "relative"; // sets the position property for the playground

    box.appendChild(welcomeMessage); // adds the welcome message to the rectangle
    playground.appendChild(box); // adds the rectangle element to the playground
    return playground; // returns the playground
}

/**
 * Returns the property in the cookie
 * @param {object} cookie the cookie stored
 * @param {string} attrName the attribute name
 * 
 * @return {string} the property
 */
function getAttrValue(cookie, attrName) {
    let start = cookie.indexOf(attrName + "="); // finds where the attribute starts
    let attrLength = attrName.length; // assigns the length of the attribute name
    if (start === -1) { 
        // no such attribute is found
        return null; // returns null
    }
    // the attribute is found
    let end = cookie.indexOf(";", start);  // where the attribute ends
    if (end === start + attrLength + 1) { 
        // the attribute does not have any values
        return null; // returns null
    }
    if (end === -1) { 
        // the end of the cookie
        end = cookie.length;
    }
    return cookie.substr(start + attrLength + 1, end - start - attrLength - 1); // returns the attribute value.
}

/**
 * Determines whether the name is in names.
 * @param {string} name the username
 * @param {array} names the names in the file "important.txt"
 * 
 * @return {boolean} true if the name is found; false otherwise.
 */
function searchNameHelper(name, names) {
    for (let nameItr of names) { 
        // iterates through all possible names
        if (name === nameItr) { 
            // if the name is found in names
            return true;
        }
    }
    return false;
}

/**
 * Display a panel of 51 labelled buttons for animation
 * starting off with speed 0 and color "red."
 * @param {object} cookie 
 * @param {string} name 
 * 
 * @return void
 */
function greeting(cookie, name) {
    let divEle = document.getElementById("greeting"); // get the div element whose id is greeting
    let form = document.createElement("form"); // create a form element
    let color = getAttrValue(cookie, "color"); // get the color property from the cookie
    let speed = getAttrValue(cookie, "speed"); // get the speed property from the cookie
    let speedController = createSpeedController(Number(speed)); // creates the speed controller buttons
    let colorController = createColorController(color); // creates the color controller buttons
    let playground = createPlayground(name); // creates the playground
    form.appendChild(speedController); // adds the speed controller to the form
    form.appendChild(colorController); // adds the color controller to the form
    divEle.appendChild(form); // adds the form to the div element
    divEle.appendChild(playground); // adds the playground to the div element
}

/**
 * Adds the message for names not in the list
 */
function noGreeting() {
    let divEle = document.getElementById("greeting"); // get the div element whose id is greeting.
    let paragraphNode = document.createElement("p"); // create a paragraph element
    paragraphNode.appendChild(document.createTextNode("No greeting for you!")); // adds the text to the paragraph element
    divEle.appendChild(paragraphNode); // adds the paragraph node to the div element
}

/**
 * Adds functions to the buttons
 * @param {string} name username
 */
function addMakeCookiesToButtons(name) {
    let buttons = document.getElementsByTagName("input"); // gets all buttons
    for (let i = 0; i < buttons.length; i += 1) { 
        // iterates through all buttons
        buttons[i].onclick = function () { // adds function for each button
        makeCookie(name); // makes a new cookie whenever they are selected
        }
    }
}

/**
 * Changes the position of the colored rectangle
 */
function changePos() {
    let box = document.getElementById("box"); // gets the div element whose id is box
    let curPos = 0; // the initial position is 0
    let velocity = Number(getAttrValue(document.cookie, "speed")); // gets the speed from the cookie

    setInterval(function() { 
        // first timer: call this function every 1 second
        if (getAttrValue(document.cookie, "speed") !== null) { 
            // the cookie contains these properties
            velocity = Number(getAttrValue(document.cookie, "speed")); // updates the speed of the rectangle
            box.style.backgroundColor = getAttrValue(document.cookie, "color"); // updates the color of the rectangle
        }
    }, 1000); // every 1 second

    setInterval(function() { 
        let playgroundWidth = window.innerWidth; // gets the width of the playground
        // seconds timer: call this function every 5 second
        if (curPos + boxProperties.boxWidth >= playgroundWidth) { 
            // if the rectangle reaches the right border
            boxProperties.direction = -1; // move left
        }
        if (curPos <= 0) { 
            // if the rectangle reaches the left border
            boxProperties.direction = 1; // move right
        }
        curPos += boxProperties.direction * velocity / vals.SPEED_FACTOR; // gets the future position of the rectangle.
        box.style.left = curPos + "px"; // updates the position of the rectangle.
    }, 5); // every 5 millisecond
}


window.onload = function() { 
    // whenever the window is loaded, run this function
    let cookie = document.cookie; // gets the cookie
    let name = this.getAttrValue(cookie, "name"); // gets the name property from the cookie
    if (name === null) { 
        // the cookie does not exist or has expired
        name = prompt("What is your name?"); // prompts the user for his or her name.

        let xhr = new XMLHttpRequest(); // Ajax request
        xhr.responseType = "text"; // sets the type of the document we are going to read
        xhr.onreadystatechange = function() { 
            // whenever there is a state change
            if (this.readyState === 4 && this.status === 200) { 
                // have processed the response and the website is loaded
                names = this.responseText.split("\n"); // gets an array of names
                if (searchNameHelper(name, names)) { 
                    // the name is in improtant.txt
                    greeting(cookie, name); // greet the important user
                    addMakeCookiesToButtons(name); // adds functions to buttons
                    changePos(); // starts changing the position of the rectangle accordingly
                } else {
                    // the name is not in important.txt
                    noGreeting();
                }
            }
        }
        xhr.open("get", vals.TEXTFILE, true); // asychronously get the text file
        xhr.send(null); // sends the request
    } else { 
        // the name is found in the cookie
        this.greeting(cookie, name); // greet the important user
        this.addMakeCookiesToButtons(name); // adds functions to buttons
        // updating it immediately
        velocity = Number(getAttrValue(document.cookie, "speed")); // updates the speed of the rectangle
        box.style.backgroundColor = getAttrValue(document.cookie, "color"); // updates the color of the rectangle
        this.changePos(); // changes the position of the rectangle
    }
}