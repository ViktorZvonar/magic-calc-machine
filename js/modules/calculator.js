import keyDownHandler from "./keyDownHandler.js";
import updateDisplay from "./updateDisplay.js";

export default function Calculator() {
  let displayValue = "0";
  let firstOperand = null;
  let secondOperand = null;
  let firstOperator = null;
  let secondOperator = null;
  let result = null;
  const buttons = document.querySelectorAll("button");

  keyDownHandler(buttons);

  updateDisplay(displayValue);

  function clickButton() {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        if (buttons[i].classList.contains("operand")) {
          inputOperand(buttons[i].value);
          updateDisplay(displayValue);
        } else if (buttons[i].classList.contains("operator")) {
          inputOperator(buttons[i].value);
        } else if (buttons[i].classList.contains("equals")) {
          inputEquals();
          updateDisplay(displayValue);
        } else if (buttons[i].classList.contains("decimal")) {
          inputDecimal(buttons[i].value);
          updateDisplay(displayValue);
        } else if (buttons[i].classList.contains("percent")) {
          inputPercent(displayValue);
          updateDisplay(displayValue);
        } else if (buttons[i].classList.contains("sign")) {
          inputSign(displayValue);
          updateDisplay(displayValue);
        } else if (buttons[i].classList.contains("clear")) clearDisplay();
        updateDisplay(displayValue);
      });
    }
  }

  clickButton();

  function inputOperand(operand) {
    if (firstOperator === null) {
      if (displayValue === "0" || displayValue === 0) {
        displayValue = operand;
      } else if (displayValue === firstOperand) {
        displayValue = operand;
      } else {
        displayValue += operand;
      }
    } else {
      if (displayValue === firstOperand) {
        displayValue = operand;
      } else {
        displayValue += operand;
      }
    }
  }

  function inputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
      secondOperator = operator;
      secondOperand = displayValue;
      result = operate(
        Number(firstOperand),
        Number(secondOperand),
        firstOperator,
      );
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
    } else if (firstOperator != null && secondOperator != null) {
      secondOperand = displayValue;
      result = operate(
        Number(firstOperand),
        Number(secondOperand),
        secondOperator,
      );
      secondOperator = operator;
      displayValue = roundAccurately(result, 15).toString();
      firstOperand = displayValue;
      result = null;
    } else {
      firstOperator = operator;
      firstOperand = displayValue;
    }
  }

  function inputEquals() {
    if (firstOperator === null) {
      displayValue = displayValue;
    } else if (secondOperator != null) {
      secondOperand = displayValue;
      result = operate(
        Number(firstOperand),
        Number(secondOperand),
        secondOperator,
      );

      if (result === "Error") {
        displayValue = "Error";
      } else {
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
      }
    } else {
      secondOperand = displayValue;
      result = operate(
        Number(firstOperand),
        Number(secondOperand),
        firstOperator,
      );

      if (result === "Error") {
        alert("Error");
        clearDisplay();
      } else {
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
      }
    }
  }

  function inputDecimal(dot) {
    if (displayValue === firstOperand || displayValue === secondOperand) {
      displayValue = "0";
      displayValue += dot;
    } else if (!displayValue.includes(dot)) {
      displayValue += dot;
    }
  }

  function inputPercent(num) {
    displayValue = (num / 100).toString();
  }

  function inputSign(num) {
    displayValue = (num * -1).toString();
  }

  function clearDisplay() {
    displayValue = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
  }

  function inputBackspace() {
    if (firstOperand != null) {
      firstOperand = null;
      updateDisplay();
    }
  }

  function operate(x, y, op) {
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        if (y === 0) {
          return "Error";
        } else {
          return x / y;
        }
      default:
        return "Error";
    }
  }

  function roundAccurately(num, places) {
    return parseFloat(Math.round(num + "e" + places) + "e-" + places);
  }
}
