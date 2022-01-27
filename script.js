let initialValue = 0;
let nextValue = 0;
let selectedOperator = "add";
let displayValue = document.getElementById("dispValue");
let operators = document.getElementsByClassName("operation");
let total = null;
let decSelected = false;
let dispFontSize = 48;
let totalSelected = false;

const numbers = document.getElementsByClassName("number-btn");
const clearBtn = document.getElementById("clear");
const equalBtn = document.getElementById("equals");
const decBtn = document.getElementById("decimal");
const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");

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
  displayValue.innerHTML = total;
  removeClass();
  decSelected = false;
  totalSelected = true;
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
  dispFontSize = 48;
  displayValue.style.fontSize = dispFontSize + "px";
  totalSelected = false;
  removeClass();
}

function numDisplay(e) {
  if (decSelected && !totalSelected) {
    nextValue += parseFloat(e.target.textContent);
    displayValue.innerHTML += parseFloat(e.target.textContent);
    reduceFont();
  } else if (!decSelected && !totalSelected) {
    nextValue = +(nextValue + e.target.textContent);
    displayValue.innerHTML = nextValue;
    reduceFont();
  } else if (totalSelected) {
    clearDisplay();
    nextValue = +(nextValue + e.target.textContent);
    displayValue.innerHTML = nextValue;
    reduceFont();
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
    nextValue = 0;
    totalSelected = false;
  } else if (total === null && decSelected && initialValue === 0) {
    decSelected = false;
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = displayValue.innerHTML;
    total = displayValue.innerHTML;
    nextValue = 0;
    totalSelected = false;
  } else if (decSelected) {
    operate(selectedOperator, initialValue, nextValue);
    decSelected = false;
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = total;
    displayValue.innerHTML = total;
    nextValue = 0;
    totalSelected = false;
  } else {
    operate(selectedOperator, initialValue, nextValue);
    removeClass();
    addClass(e);
    selectedOperator = e.target.id;
    initialValue = total;
    displayValue.innerHTML = total;
    nextValue = 0;
    totalSelected = false;
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

function switchSign() {
  if (Math.sign(displayValue.innerHTML) === 1) {
    displayValue.innerHTML = -Math.abs(displayValue.innerHTML);
    total = displayValue.innerHTML;
    nextValue = -Math.abs(nextValue);
  } else if (Math.sign(displayValue.innerHTML) === -1) {
    displayValue.innerHTML = Math.abs(displayValue.innerHTML);
    nextValue = displayValue.innerHTML;
    total = displayValue.innerHTML;
    initialValue = 0;
    selectedOperator = "add";
  } else if (Math.sign(displayValue.innerHTML) === 0) {
    return;
  }
}

function percentage() {
  displayValue.innerHTML = parseFloat(displayValue.innerHTML) / 100;
  nextValue = parseFloat(nextValue) / 100;
}

function reduceFont() {
  let dispLen = displayValue.clientWidth;
  let i = dispLen;
  while (i >= 213) {
    displayValue.style.fontSize = dispFontSize - 0.2 + "px";
    dispFontSize = dispFontSize - 0.2;
    i--;
  }
}

function backspace() {
  if (displayValue.innerHTML.length === 1) {
    displayValue.innerHTML = 0;
    nextValue = 0;
  } else {
    displayValue.innerHTML = displayValue.innerHTML.substring(
      0,
      displayValue.innerHTML.length - 1
    );
    nextValue = nextValue.substring(0, nextValue.length - 1);
  }
}

percentBtn.addEventListener("click", percentage);

decBtn.addEventListener("click", addDecimal);

equalBtn.addEventListener("click", totalUp);

clearBtn.addEventListener("click", clearDisplay);

signBtn.addEventListener("click", switchSign);

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", numDisplay);
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", selectOperator);
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  if (event.key === "1") {
    document.getElementById("num1").click();
  } else if (event.key === "2") {
    document.getElementById("num2").click();
  } else if (event.key === "3") {
    document.getElementById("num3").click();
  } else if (event.key === "4") {
    document.getElementById("num4").click();
  } else if (event.key === "5") {
    document.getElementById("num5").click();
  } else if (event.key === "6") {
    document.getElementById("num6").click();
  } else if (event.key === "7") {
    document.getElementById("num7").click();
  } else if (event.key === "8") {
    document.getElementById("num8").click();
  } else if (event.key === "9") {
    document.getElementById("num9").click();
  } else if (event.key === "0") {
    document.getElementById("num0").click();
  } else if (event.key === "c") {
    clearBtn.click();
  } else if (event.key === "Enter") {
    equalBtn.click();
  } else if (event.key === "*") {
    document.getElementById("multiply").click();
  } else if (event.key === "-") {
    document.getElementById("subtract").click();
  } else if (event.key === "/") {
    document.getElementById("divide").click();
  } else if (event.key === "+") {
    document.getElementById("add").click();
  } else if (event.key === "%") {
    percentBtn.click();
  } else if (event.key === "s") {
    signBtn.click();
  } else if (event.key === ".") {
    decBtn.click();
  } else if (event.key === "Backspace") {
    backspace();
  }
});
