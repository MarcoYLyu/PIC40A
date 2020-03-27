function change2Circle() {
    squares = document.getElementsByTagName("div");
    for (let i = 0; i < squares.length; ++i) {
        if (squares[i].getAttribute("class") === "square") {
            squares[i].setAttribute("class", "circle");
        }
    }
}

function change2Square() {
    circles = document.getElementsByTagName("div");
    for (let i = 0; i < circles.length; ++i) {
        if (circles[i].getAttribute("class") === "circle") {
            circles[i].setAttribute("class", "square");
        }
    }
}

function flip() {
    shapes = document.getElementsByTagName("div");
    for (let i = 0; i < shapes.length; ++i) {
        let shape = shapes[i].getAttribute("class");
        if (shape === "circle") {
            shapes[i].setAttribute("class", "square");
        } else {
            shapes[i].setAttribute("class", "circle");
        }
    }
}