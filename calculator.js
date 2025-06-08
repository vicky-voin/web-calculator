let firstNumber;
let secondNumber;
let operation;

let outputValue = '0';
let outputElement = document.querySelector(".output");

displayValue('0', false);

for (let i = 0; i <= 9; i++) {
    let numberElement = document.querySelector(`#num${i}`);
    numberElement.addEventListener("click", () => {
        onNumberPressed(i);
    })
}

let clearButton = document.querySelector("#clear.special");
clearButton.addEventListener("click", clear);

let operations = document.querySelectorAll(".operation");
for (operationElement of operations) {
    let operatorText = operationElement.textContent;

    operationElement.addEventListener("click", () => {
        onOperationPressed(operatorText);
    });
}

function clear() {
    firstNumber = null;
    secondNumber = null;
    operation = null;

    displayValue('0', false);
}

function onNumberPressed(numberValue) {
    if (outputElement.textContent === `0` ||
        operation !== null) {
        displayValue(numberValue, false);
    }
    else {
        displayValue(numberValue);
    }
}

function onOperationPressed(operationValue) {
    let isChainingOperators = operation != null;

    if (operationValue == '=' || isChainingOperators) {
        secondNumber = outputValue;
        onEqualsPressed();

        if(!isChainingOperators)
        {
            return;
        }
    }

    firstNumber = outputValue;
    switch (operationValue) {
        case '+':
            operation = add;
            break;
        case '-':
            operation = subtract;
            break;
        case '/':
            operation = divide;
            break;
        case '*':
            operation = multiply;
            break;
    }
}

function onEqualsPressed() {
    let result = operate(firstNumber, secondNumber, operation);
    displayValue(result, false);

    firstNumber = result;
    secondNumber = null;
    operation = null;
}

function displayValue(charToDisplay, append = true) {
    if (append)
    {
        outputElement.textContent += charToDisplay;
        outputValue = outputElement.textContent;
    }
    else
    {
        outputValue = charToDisplay;
        let valueAsNumber = +charToDisplay;
        if(Number.isInteger(valueAsNumber))
        {
            outputElement.textContent = valueAsNumber;
        }
        else
        {
            outputElement.textContent = (+charToDisplay).toFixed(6);
        }
    }
}

function operate(a, b, operator) {
    return operator(+a, +b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}