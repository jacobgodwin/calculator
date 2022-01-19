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

function operate(operator, x, y) {
  if (operator === "add") {
    return add(x, y);
  } else if (operator === "subtract") {
    return subtract(x, y);
  } else if (operator === "multiply") {
    return multiply(x, y);
  } else if (operator === "divide") {
    return divide(x, y);
  }
}
