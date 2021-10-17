let runningTotal = 0;
let buffer = "0" //waiting for user to enter something
let previousOperator = null;
const screen = document.querySelector(".screen");

document.querySelector(`.calc-buttons`).addEventListener("click", function (event) {
    buttonClick(event.target.innerText); //tam, kad gautumėm kas parašyta ant mygtuko
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);

    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }

}

function handleSymbol(value) {
switch (value) { //reiškia "imk value, jeigu equals to this, do this, jeigu equals to this, do this"
    case `C`:
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break; //reikia šitą parašyti, reiškia the end of this case.
    case "=":
        if (previousOperator === null) { // null yra absence of anything. nothing has previously been assigned.
            return;
        }
        flushOperation (parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
    case "←":
        if (buffer.length === 1) {
            buffer = "0";
        } else {
            buffer = buffer.substring(0, buffer.length-1);
        }
        break;
        default: 
        handleMath(value);
        break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
if (runningTotal === 0) {
    runningTotal = intBuffer;
} else {
    flushOperation(intBuffer)
}

previousOperator = value;
buffer = "0";
}

function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "×") {
        runningTotal *= intBuffer;

    } else {
        runningTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;

}