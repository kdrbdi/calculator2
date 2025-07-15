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
  return a * b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

let result, operand1, operand2, operator, secondOperandStartIndex;

const keypad = document.querySelector("#keypad");
const display = document.querySelector("#display");
const history = document.querySelector("#history");

function updateDisplay(str) {
  display.textContent = str;
}

display.textContent = "0";

keypad.addEventListener("click", (e) => {
  // Handle numbers
  if (e.target.classList.contains("number")) {
    if (display.textContent === "0" || result) {
      history.textContent = result;
      result = 0;
      display.textContent = e.target.textContent;
    } else {
      display.textContent += e.target.textContent;
    }
  }
  //  Handle operators
  if (e.target.classList.contains("operator")) {
    if (!operator && display.textContent) {
      operand1 = +display.textContent;
      if (!history.textContent) {
        history.textContent += `${operand1} ${e.target.textContent} `;
      } else {
        history.textContent += ` ${e.target.textContent} `;
      }
      updateDisplay("");
      switch (e.target.textContent) {
        case "+":
          operator = "+";
          break;
        case "-":
          operator = "-";
          break;
        case "/":
          operator = "/";
          break;
        case "*":
          operator = "*";
          break;
      }
    }
  }
  //   Handle functions
  if (e.target.classList.contains("function")) {
    switch (e.target.id) {
      case "delete":
        display.textContent = display.textContent.slice(
          0,
          display.textContent.length - 1
        );
        break;
      case "clear":
        display.textContent = "";
        history.textContent = "";
        break;
      case "equal":
        operand2 = +display.textContent;
        history.textContent += operand2;
        result = operate(operand1, operand2, operator);
        updateDisplay(result);
        operator = "";
        operand2 = null;
        break;
    }
  }
});
