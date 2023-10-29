let currentInput = '';
let currentOperator = '';
let memory = '';
let isThemeDark = false;
let operationInProgress = false;
let newS = true;

function updateDisplay() 
{
    const display = document.getElementById('display');
    display.textContent = currentInput;
}

function appendNumber(number) {
    if(!newS)
    {
        clearDisplay();
    }
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number.toString();
    } else {
        currentInput += number.toString();
    }
    updateDisplay();
}

function setOperator(operator) {
    if(memory !== '')
    {
        currentOperator=operator;
    }
    else
    {
        memory = currentInput;
        currentInput = '';
        currentOperator = operator;
        newS=true;
    }
    highlightOperatorButton(operator);
}

function highlightOperatorButton(operator) {
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.classList.remove('active-operator');
    });

    const button = document.querySelector(`.operator[data-operator="${operator}"]`);
    if (button) {
        button.classList.add('active-operator');
    }
    
    operationInProgress = true;
}

function clearOperatorHighlights(){
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
        button.classList.remove('active-operator');
    });
    operationInProgress = false;
}

function calculate() {
    if (currentOperator === '' || currentInput === '') return;

    if (currentOperator === '+') {
        currentInput = (parseFloat(memory) + parseFloat(currentInput)).toString();
    } else if (currentOperator === '-') {
        currentInput = (parseFloat(memory) - parseFloat(currentInput)).toString();
    } else if (currentOperator === '*') {
        currentInput = (parseFloat(memory) * parseFloat(currentInput)).toString();
    } else if (currentOperator === '/') {
        if (parseFloat(currentInput) === 0) {
            currentInput = 'Error';
        } else {
            currentInput = (parseFloat(memory) / parseFloat(currentInput)).toString();
        }
    }
    memory = '';
    clearOperatorHighlights();
    currentOperator = '';
    updateDisplay();
    newS=false;
}
function clearDisplay() {
    currentInput = '0';
    currentOperator = '';
    memory = '';
    clearOperatorHighlights();
    newS=true;
    updateDisplay();
}

function backspace() {
    if(currentInput === ''){
        currentOperator = '';
    }
    else
    {
        if (currentInput !== 'Error') {
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '') {
                currentInput = '0';
            }
            updateDisplay();
        }
    }
}

function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const calculator = document.querySelector('.calculator');
    isThemeDark = themeToggle.checked;

    if (isThemeDark) {
        calculator.classList.add('dark-theme');
    } else {
        calculator.classList.remove('dark-theme');
    }
}


updateDisplay();
