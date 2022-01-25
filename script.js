let initialValue = 0;
let nextValue = 0;
let selectedOperator = "add";
let displayValue = document.getElementById("dispValue");
let operators = document.getElementsByClassName("operation");
let total = 0;
const numbers = document.getElementsByClassName("number-btn");
const clearBtn = document.getElementById("clear");
const equalSign = document.getElementById("equals");

function add(x, y) {
  let sum = 0;
  sum = x + y;
  return Math.round((sum + Number.EPSILON) * 100) / 100;
}

function subtract(x, y) {
  let diff = 0;
  diff = x - y;
  return Math.round((diff + Number.EPSILON) * 100) / 100;
}

function multiply(x, y) {
  let prod = 0;
  prod = x * y;
  return Math.round((prod + Number.EPSILON) * 100) / 100;
}

function divide(x, y) {
  let quot = 0;
  if (y === 0) {
    return "ERROR";
  } else {
    quot = x / y;
    return Math.round((quot + Number.EPSILON) * 100) / 100;
  }
}

function operate(selectedOperator, x, y) {
  if (selectedOperator === "add") {
    total = add(x, y);
  } else if (selectedOperator === "subtract") {
    total = subtract(x, y);
  } else if (selectedOperator === "multiply") {
    total = multiply(x, y);
  } else if (selectedOperator === "divide") {
    total = divide(x, y);
  }
}

equalSign.addEventListener("click", totalUp);

function totalUp() {
  displayValue.innerHTML = total;
  removeClass();
}

function clearDisplay() {
  displayValue.innerHTML = 0;
  initialValue = 0;
  nextValue = 0;
  total = null;
  selectedOperator = "add";
  removeClass();
  console.log("total: " + total);
  console.log("IV: " + initialValue);
  console.log("NV: " + nextValue);
  console.log("Op: " + selectedOperator);
}

function numDisplay(e) {
  if (total === null) {
    total = 0;
    displayValue.innerHTML = parseInt(e.target.textContent);
    nextValue = parseInt(e.target.textContent);
    operate(selectedOperator, initialValue, nextValue);
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else {
    displayValue.innerHTML = parseInt(e.target.textContent);
    nextValue = parseInt(e.target.textContent);
    operate(selectedOperator, initialValue, nextValue);
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  }
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
  if (total === null) {
    removeClass();
    e.target.classList.remove("operation");
    e.target.classList.add("operation-selected");
    selectedOperator = e.target.id;
    initialValue = parseInt(displayValue.innerHTML);
    nextValue = 0;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else {
    removeClass();
    e.target.classList.remove("operation");
    e.target.classList.add("operation-selected");
    selectedOperator = e.target.id;
    initialValue = total;
    nextValue = 0;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  }
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
