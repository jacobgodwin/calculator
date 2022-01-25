let initialValue = 0;
let nextValue = 0;
let selectedOperator = "add";
let displayValue = document.getElementById("dispValue");
let operators = document.getElementsByClassName("operation");
let total = null;
let decSelected = false;

const numbers = document.getElementsByClassName("number-btn");
const clearBtn = document.getElementById("clear");
const equalSign = document.getElementById("equals");
const decBtn = document.getElementById("decimal");

function add(x, y) {
  let sum = 0;
  x = Number(x);
  y = Number(y);
  sum = x + y;
  return Math.round((sum + Number.EPSILON) * 100) / 100;
}

function subtract(x, y) {
  let diff = 0;
  x = Number(x);
  y = Number(y);
  diff = x - y;
  return Math.round((diff + Number.EPSILON) * 100) / 100;
}

function multiply(x, y) {
  let prod = 0;
  x = Number(x);
  y = Number(y);
  prod = x * y;
  return Math.round((prod + Number.EPSILON) * 100) / 100;
}

function divide(x, y) {
  let quot = 0;
  if (y === 0) {
    return "ERROR";
  } else {
    x = Number(x);
    y = Number(y);
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

function totalUp() {
  operate(selectedOperator, initialValue, nextValue);
  console.log("total: " + total);
  console.log("IV: " + initialValue);
  console.log("NV: " + nextValue);
  console.log("Op: " + selectedOperator);
  displayValue.innerHTML = total;
  removeClass();
  decSelected = false;
}

function addDecimal() {
  if (!decSelected) {
    decSelected = true;
    displayValue.innerHTML += ".";
    nextValue += ".";
  }
}

function clearDisplay() {
  displayValue.innerHTML = 0;
  initialValue = 0;
  nextValue = 0;
  total = null;
  selectedOperator = "add";
  decSelected = false;
  removeClass();
  console.log("total: " + total);
  console.log("IV: " + initialValue);
  console.log("NV: " + nextValue);
  console.log("Op: " + selectedOperator);
}

function numDisplay(e) {
  if (decSelected) {
    nextValue += parseFloat(e.target.textContent);
    displayValue.innerHTML += parseFloat(e.target.textContent);
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else {
    nextValue = parseFloat(e.target.textContent);
    displayValue.innerHTML = parseFloat(e.target.textContent);
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  }
}

function selectOperator(e) {
  if (total === null && !decSelected && initialValue === 0) {
    operate(selectedOperator, initialValue, nextValue);
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = displayValue.innerHTML;
    total = displayValue.innerHTML;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else if (total === null && decSelected && initialValue === 0) {
    decSelected = false;
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = displayValue.innerHTML;
    total = displayValue.innerHTML;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else if (decSelected) {
    operate(selectedOperator, initialValue, nextValue);
    decSelected = false;
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = total;
    displayValue.innerHTML = total;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  } else {
    operate(selectedOperator, initialValue, nextValue);
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = total;
    displayValue.innerHTML = total;
    console.log("total: " + total);
    console.log("IV: " + initialValue);
    console.log("NV: " + nextValue);
    console.log("Op: " + selectedOperator);
  }
}

function addClass(e) {
  e.target.classList.remove("operation");
  e.target.classList.add("operation-selected");
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

decBtn.addEventListener("click", addDecimal);

equalSign.addEventListener("click", totalUp);

clearBtn.addEventListener("click", clearDisplay);

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", numDisplay);
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", selectOperator);
}
