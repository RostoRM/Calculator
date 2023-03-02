const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearbtn = document.getElementById('clear-btn');

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextvalue = false;

const sendNumberValue = (number) => {
  // Replace current display value if first value is entered
  if (awaitingNextvalue) {
    calculatorDisplay.textContent = number;
    awaitingNextvalue = false;
  } else {
    // If Current display va;ue is 0, replace it, if not add number
    const displayvalue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayvalue === '0' ? number : displayvalue + number;
  }
};

const addDecimal = () => {
  // If operator pressed, don't add decimal
  if (awaitingNextvalue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
};

const useOperator = (operator) => {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextvalue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextvalue = true;
  operatorValue = operator;
};

// Reset all values, Display
const resetAll = () => {
  firstValue = 0;
  operatorValue = '';
  awaitingNextvalue = false;
  calculatorDisplay.textContent = '0';
};

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Event Listeners
clearbtn.addEventListener('click', resetAll);
