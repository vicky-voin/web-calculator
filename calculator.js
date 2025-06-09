let firstNumber;
let secondNumber;
let operation;

let outputValue = '0';
let outputElement = document.querySelector(".output");

clear();

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
    //do not process numbers if the output is displaying an error message
    if (isNaN(outputElement.textContent)) {
        return;
    }

    let replaceOutputValue = outputElement.textContent == '0' || operation !== null;
    displayValue(numberValue, !replaceOutputValue);

    if (firstNumber == null) {
        firstNumber = outputValue;
    }
    else if (operation != null && firstNumber != null) {
        secondNumber = outputValue;
    }
}

function onOperationPressed(operationValue) {
    //do not process operators if the output is displaying an error message
    if (isNaN(outputElement.textContent)) {
        return;
    }

    let isChainingOperators = operation != null;
    let equalsPressed = operationValue == '=';
    let canProcessEquals = firstNumber != null && secondNumber != null && operation != null;

    if (equalsPressed && !canProcessEquals) {
        return;
    }

    if (equalsPressed || isChainingOperators) {

        onEqualsPressed();

        if (!isChainingOperators) {
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

    firstNumber = isNaN(result)? null : result;
    secondNumber = null;
    operation = null;
}

function displayValue(charToDisplay, append = true) {
    if (append) {
        outputElement.textContent += charToDisplay;
        outputValue = outputElement.textContent;
    }
    else {
        outputValue = charToDisplay;
        let valueAsNumber = +charToDisplay;
        if (Number.isInteger(valueAsNumber)) {
            outputElement.textContent = valueAsNumber;
        }
        else if (!Number.isNaN(valueAsNumber)) {
            outputElement.textContent = valueAsNumber.toFixed(6);
        }
        else {
            outputElement.textContent = charToDisplay;
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
    if (b == 0)
        return 'Cannot divide by 0!';

    return a / b;
}