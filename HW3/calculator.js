"use strict";

/**
 * This function performs the binary operation on its two inputs.
 * 
 * @param {String} op an operation from [+, -, *, /].
 * @param {Number} a the first operand
 * @param {Number} b the second operand
 * 
 * @return {Number} c = a op b.
*/
function calculate (op, a, b) {
    const ops = {
        "+" : (a, b) => a + b,
        "-" : (a, b) => a - b,
        "*" : (a, b) => a * b,
        "/" : (a, b) => a / b
    };    
    return (ops[op])(a, b);
}

/**
 * This function write the content to the element with id result.
 * 
 * @param {String} content: the html we want to write to the block whose id is result.
 * @return {NULL} void.
*/
function writeResult(content) {
    document.getElementById("result").innerHTML = content;
}

/**
 * This function validates whether the input is valid.
 * 
 * @param {Number} N the value user types in the text box
 * @return {Boolean} false if N is an invalid value; true otherwise.
*/
function evaluate(N) {
    let num = parseFloat(N.trim());
    if (num === NaN || num.toString().length !== N.trim().length) {
        return false;
    }
    return true;
}

function main() {
    let rawValue1 = document.getElementById("value1").value;
    let rawValue2 = document.getElementById("value2").value;

    if (!evaluate(rawValue1) || !evaluate(rawValue2)) {
        writeResult("Result: Invalid Values");
    }
    else {
        let value1 = parseFloat(rawValue1);
        let value2 = parseFloat(rawValue2);
        let op;
        let isAssigned = false;

        for (let i = 1; i <= 4 && !isAssigned; ++i) {
            if (document.getElementById("r" + i).checked) {
                op = document.getElementById("r" + i).value;
                isAssigned = true;
            }
        }
        if (!isAssigned) {
            writeResult("Result: No Operators Is Given");
        } else {
            writeResult("Result: " + calculate(op, value1, value2));
        }
    }
}

alert("This is a Javascript calculator");