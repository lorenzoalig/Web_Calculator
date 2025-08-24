// Gets document elements as constants
const display = document.getElementById("display");

// Global flags
var firstPress = true;
var firstComma = true;
var lastOperation = 'none';
var invertedNumber = false;

// Global variables
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
            if(lastChar == '0')
                display.innerHTML += symbol;
            else
                display.innerHTML += '0' + symbol;
            firstComma = false;
            firstPress = false;
            lastOperation = 'none';
            currentNumberIndex = 2;
            console.log('size of current number: ' + currentNumberIndex);
        } else if(symbol == '0') {
            if(display.innerHTML != '0' && lastChar != '0') {
                display.innerHTML += symbol;
                lastOperation = 'none';
                currentNumberIndex = 1;
                console.log('size of current number: ' + currentNumberIndex);
            } 
        } else if (display.innerHTML != '0' && lastChar != '0') {
            console.log('caso 1');
            display.innerHTML += symbol;
            firstPress = false;
            lastOperation = 'none';
            currentNumberIndex = 1;
            console.log('size of current number: ' + currentNumberIndex);
            } else if(display.innerHTML == '0') {
                console.log('caso 2');
                display.innerHTML = symbol;
                firstPress = false;
                lastOperation = 'none';
                currentNumberIndex = 1;
                console.log('size of current number: ' + currentNumberIndex);
                } else {
                    console.log('caso 3');
                    display.innerHTML = display.innerHTML.substring(0, displayLength - 1);
                    display.innerHTML += symbol;
                    firstPress = false;
                    lastOperation = 'none';
                    currentNumberIndex = 1;
                    console.log('size of current number: ' + currentNumberIndex);
        }
    } else if(invertedNumber) {
        insertOperation('*');
        insert(symbol);
        } else if(symbol == '.' && firstComma == true) {
            console.log('entrou 1');
            display.innerHTML += symbol;
            firstComma = false;
            currentNumberIndex++;
            console.log('size of current number: ' + currentNumberIndex);
            } else if((symbol != '.' || firstComma != false)) {
                console.log('entrou 2');
                display.innerHTML += symbol;
                currentNumberIndex++;
                console.log('size of current number: ' + currentNumberIndex);
            }
}

function insertOperation(symbol) {
    displayLength = display.innerHTML.length;
    lastChar = display.innerHTML[displayLength - 1];
    firstPress = true;
    firstComma = true;
    invertedNumber = false;
    if(lastChar == '.') {
        console.log('matches: ' + display.innerHTML.match(/(\d)(\.)(?!.*\d\.)/g));
        let result = display.innerHTML.replace(/(\d?\.)(?!.*\d?\.)/g, '$10');
        display.innerHTML = result;
    }
    if(lastOperation == 'none' || lastOperation == '%') {
        display.innerHTML += " ";
        display.innerHTML += symbol;
        display.innerHTML += " ";
        lastOperation = symbol;
    } else if(lastOperation == '*' || lastOperation == '/' || lastOperation == '+') {
        if(symbol == '-') {
            display.innerHTML += " ";
            display.innerHTML += symbol;
            lastOperation = symbol;
        }
    }
    currentNumberIndex = 0;
    console.log('size of current number:' + currentNumberIndex);
}

function invertNumber() {
    let spl;
    spl = display.innerHTML.split(/\s/);
    console.log(spl);
    currentNumber = spl[spl.length - 1];
    console.log(currentNumber);
    currentNumberIndex = currentNumber.length;
    if(currentNumber != '0') {
        let result;
        result = currentNumber + ' * (-1)';
        result = eval(result);
        if (result > 0) {
            spl[spl.length - 1] = result;
            spl = spl.join(' ');
            display.innerHTML = spl;
            currentNumberIndex -= 3;    //Fixme: broken when negative input for number
            console.log('size of current number:' + currentNumberIndex);
            invertedNumber = false;
        } else {
            result = "(" + result + ")";
            spl[spl.length - 1] = result;
            spl = spl.join(' ');
            display.innerHTML = spl;
            currentNumberIndex += 3;    // Fixme: broken when negative input for number
            invertedNumber = true;
            console.log('size of current number:' + currentNumberIndex);
        }
    }        
}

function calculate() {
    console.log('matches: ' + display.innerHTML.match(/(\s?%\s)(\(?\-?\d+\)?)/g));
    console.log('matches for unused operation: ' + display.innerHTML.match(/((\s)(\+|\-|\*|\/))(?!.*(\d))(\s)/g));
    let result = display.innerHTML
        .replace(/(\s)(\+|\-|\*|\/)(\s)$/g, '') // Deletes last operation symbol if it is not followed by a number
        .replace(/(\s?%\s)(\(?\-?\d+\)?)/g, '$1* $2')   // Adds a * following every % if it is the sole operation between two numbers
        .replace(/%/g, '/ 100');    // Transforms every % into a '/100'
    console.log('entrada innerHTML: ' + display.innerHTML);
    console.log('entrada calculate: ' + result);
    display.innerHTML = eval(result);
    console.log('saída calculate: ' + display.innerHTML);
    if(display.innerHTML == '0')
        firstPress = true;
    if(/\./g.test(display.innerHTML))
        firstComma = false;
    invertedNumber = false;
    lastOperation = 'none';
    currentNumberIndex = display.innerHTML.length;
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
    if(!isNaN(key))
        insert(key);
    else {
        switch(key) {
            case '+':
            document.getElementById('plus').click();    
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
})