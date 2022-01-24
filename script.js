let initialValue = 0;
let nextValue = 0;
let selectedOperator = "add";
let displayValue = document.getElementById("dispValue");
let operators = document.getElementsByClassName("operation");
const numbers = document.getElementsByClassName("number-btn");
const clearBtn = document.getElementById("clear");

function add(x, y) {
  let sum = 0;
  sum = x + y;
  return sum;
}

function subtract(x, y) {
  let diff = 0;
  diff = x - y;
  return diff;
}

function multiply(x, y) {
  let prod = 0;
  prod = x * y;
  return prod;
}

function divide(x, y) {
  let quot = 0;
  quot = x / y;
  return quot;
}

function operate(selectedOperator, x, y) {
  if (selectedOperator === "add") {
    displayValue.innerHTML = add(x, y);
  } else if (selectedOperator === "subtract") {
    displayValue.innerHTML = subtract(x, y);
  } else if (selectedOperator === "multiply") {
    displayValue.innerHTML = multiply(x, y);
  } else if (selectedOperator === "divide") {
    displayValue.innerHTML = divide(x, y);
  }
}

function clearDisplay() {
  displayValue.innerHTML = 0;
  initialValue = 0;
  nextValue = 0;
  removeClass();
}

function numDisplay(e) {
  displayValue.innerHTML = parseInt(e.target.textContent);
  nextValue = parseInt(e.target.textContent);
  operate(selectedOperator, initialValue, nextValue);
  removeClass();
}

clearBtn.addEventListener("click", clearDisplay);

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", numDisplay);
  numbers[i].addEventListener("click", operate);
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", addClass);
}

function addClass(e) {
  removeClass();
  e.target.classList.remove("operation");
  e.target.classList.add("operation-selected");
  selectedOperator = e.target.id;
  initialValue = parseInt(displayValue.innerHTML);
  nextValue = 0;
  console.log(selectedOperator);
}

function removeClass() {
  let clickedOp = document.getElementsByClassName("operation-selected");
  for (const clicked of clickedOp) {
    selectedOperator = clicked.id;
    if (clicked.className === "operation-selected") {
      clicked.className = "operation";
    }
  }
}
