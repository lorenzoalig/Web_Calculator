// Gets document elements as constants
const display = document.getElementById("display");
var firstPress = true;
var firstComma = true;
var lastThree = 0;
var currentNumberIndex = 0;
var displayLength;
var lastChar;

function insert(symbol) {
    displayLength = display.innerHTML.length;
    lastChar = display.innerHTML[displayLength - 1];
    if(firstPress) {
        if(symbol == '.') {
            display.innerHTML += symbol;
            firstComma = false;
            firstPress = false;
            currentNumberIndex = 2;
            console.log(currentNumberIndex);
        } else if(symbol == '0') {
            if(display.innerHTML != '0' && lastChar != '0') {
                display.innerHTML += symbol;
                currentNumberIndex = 1;
                console.log(currentNumberIndex);
            } 
        } else if (display.innerHTML != '0' && lastChar != '0') {
            console.log('caso 1');
            display.innerHTML += symbol;
            firstPress = false;
            currentNumberIndex = 1;
            } else if(display.innerHTML == '0') {
                console.log('caso 2');
                display.innerHTML = symbol;
                firstPress = false;
                currentNumberIndex = 1;
                } else {
                    console.log('caso 3');
                    display.innerHTML = display.innerHTML.substring(0, displayLength - 1);
                    display.innerHTML += symbol;
                    firstPress = false;
                    currentNumberIndex = 1;
        }
    } else if(symbol == '.' && firstComma == true) {
        display.innerHTML += symbol;
        firstComma = false;
        currentNumberIndex++;
        console.log(currentNumberIndex);
        } else if (symbol != '.' || firstComma != false) {
            display.innerHTML += symbol;
            currentNumberIndex++;
            console.log(currentNumberIndex);
        }
}

function insertOperation(symbol) {
    displayLength = display.innerHTML.length;
    lastChar = display.innerHTML[displayLength - 1];
    if(!firstPress || lastChar == '0') {
        display.innerHTML += " ";
        display.innerHTML += symbol;
        display.innerHTML += " ";
        firstComma = true;
        firstPress = true;
        currentNumberIndex = 0;
        console.log(currentNumberIndex);
    }
}

function calculate() {
    console.log(display.innerHTML)
    display.innerHTML = eval(display.innerHTML);
    currentNumberIndex = display.innerHTML.length;
    console.log(currentNumberIndex);
}

function invertNumber() {

}

function clearScreen() {
    display.innerHTML = "0";
    firstPress = true;
    firstComma = true;
}