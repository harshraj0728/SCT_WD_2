const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.buttons-grid button');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function handleNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = ${parseFloat(result.toFixed(7))};
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function handleEqualSign() {
    if (operator && firstOperand !== null) {
        const inputValue = parseFloat(currentInput);
        const result = calculate(firstOperand, inputValue, operator);
        currentInput = ${parseFloat(result.toFixed(7))};
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return first / second;
    return second;
}

function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { textContent } = event.target;

        if (textContent === 'C') {
            clearCalculator();
        } else if (textContent === '.') {
            handleDecimal();
        } else if (['+', '-', '*', '/'].includes(textContent)) {
            handleOperator(textContent);
        } else if (textContent === '=') {
            handleEqualSign();
        } else {
            handleNumber(textContent);
        }
    });
});