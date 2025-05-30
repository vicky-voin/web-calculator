let firstNumber;
let secondNumber;
let operation;

let outputValue = '0';
let outputElement = document.querySelector(".output");

displayValue('0');

for(let i = 0; i <= 9; i++)
{
    let numberElement = document.querySelector(`#num${i}`);
    numberElement.addEventListener("click", () => {
        displayValue(i);
    })
}

function displayValue(charToDisplay)
{
    if(outputElement.textContent === `0`)
    {
        outputElement.textContent = charToDisplay;
    }
    else{
        outputElement.textContent += charToDisplay;
    }
    
    outputValue = outputElement.textContent;
}

function operate(a,b,operator)
{
    operator(a,b);
}

function add(a,b)
{
    return a + b;
}

function subtract(a,b)
{
    return a - b;
}

function multiply(a,b)
{
    return a * b;
}

function divide(a,b)
{
    return a / b;
}