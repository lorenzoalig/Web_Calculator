// Gets document elements as constants
const display = document.getElementById("display");
var firstPress = true;
var firstComma = true;
var lastThree = 0;
var currentNumberIndex = 0;
var currentNumber;
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
        if(symbol != '%')
            firstPress = true;
        currentNumberIndex = 0;
        console.log('size of current number:' + currentNumberIndex);
    }
}

function calculate() {
    let result = display.innerHTML
        .replace(/(\d+)(\s%\s)(\d+)/g, '$1$2* $3')
        .replace(/%/g, '/ 100');
    display.innerHTML = eval(result);
    if(display.innerHTML == '0')
        firstPress = true;
    currentNumberIndex = display.innerHTML.length;
}

function invertNumber() {
    let spl;
    spl = display.innerHTML.split(/\s/);
    currentNumber = spl[spl.length - 1];
    currentNumberIndex = currentNumber.length
    let result;
    result = currentNumber + ' * (-1)';
    result = eval(result);
    if (result > 0) {
        spl[spl.length - 1] = result;
        spl = spl.join(' ');
        display.innerHTML = spl;
        currentNumberIndex -= 3;
    } else {
        result = "(" + result + ")";
        spl[spl.length - 1] = result;
        spl = spl.join(' ');
        display.innerHTML = spl;
        currentNumberIndex += 3;
    }        
}

function clearScreen() {
    display.innerHTML = "0";
    firstPress = true;
    firstComma = true;
}

document.addEventListener('keydown', function(input) {
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function () {
            this.blur();
        })
    })

    const key = input.key;
    console.log(key)

    if(!isNaN(key))
        insert(key);
    else {
        switch(key) {
            case '+':
                insertOperation(key);
                break;
            case '-':
                insertOperation(key);
                break;
            case '*':
                insertOperation(key);
                break;
            case '/':
                insertOperation(key);
                break;
            case '%':
                insertOperation(key);
                break;
            case ',':
                insert('.');
                break;
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                clearScreen();
                break;
            case 'Delete':
                clearScreen();
                break;
            case 'F9':
                invertNumber();
                break;
        }
    }
});