import { MAX_DIGITS } from "./constants.js";
import { truncate } from "./utils.js";

const state = {
  hiddenOperand: "0",
  visibleOperand: "0",
  operator: null,
  hasTypedAfterOperation: false,
};

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

export function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${state.visibleOperand}`;
}

function operate() {
  if (!state.operator) return;

  const result = state.operator(+state.hiddenOperand, +state.visibleOperand);
  const truncatedResult = truncate(result);
  state.visibleOperand = truncatedResult;
  state.operator = null;
  state.hasTypedAfterOperation = false;

  updateDisplay();
}

function setOperator(operator) {
  if (state.operator && state.hasTypedAfterOperation) {
    // Solves previous operation if user has not pressed equals yet and has typed something to operate on
    operate();
  } else {
    // Prepares to reset display value when user starts typing next number
    state.hiddenOperand = state.visibleOperand;
    state.hasTypedAfterOperation = false;
    updateDisplay();
  }

  state.operator = operator;
}

function switchSign() {
  state.visibleOperand = String(-state.visibleOperand);
  if (!state.hasTypedAfterOperation) {
    state.hiddenOperand = state.visibleOperand;
  }
  updateDisplay();
}

function useDecimal() {
  const isDecimal = state.visibleOperand.includes(".");
  if (isDecimal) return;
  handleNumberInput(".");
}

function calculatePercentage() {
  state.visibleOperand = String(+state.visibleOperand / 100);
  if (!state.hasTypedAfterOperation) {
    state.hiddenOperand = state.visibleOperand;
  }
  updateDisplay();
}

function clear() {
  state.visibleOperand = state.hiddenOperand = "0";
  state.operator = null;
  updateDisplay();
}

function handleNumberInput(input) {
  if (!state.hasTypedAfterOperation) {
    state.hiddenOperand = state.visibleOperand;
    state.visibleOperand = "0";
    state.hasTypedAfterOperation = true;
  }

  if (state.visibleOperand.length >= MAX_DIGITS) return;

  if (input === "." && state.visibleOperand === "0") {
    state.visibleOperand = "0.";
  } else if (state.visibleOperand === "0") {
    state.visibleOperand = "" + input;
  } else {
    state.visibleOperand = `${state.visibleOperand}` + input;
  }

  updateDisplay();
}

function handleBackspace() {
  if (state.visibleOperand.length === 1) {
    state.visibleOperand = "0";
  } else {
    state.visibleOperand = state.visibleOperand.slice(
      0,
      state.visibleOperand.length - 1,
    );
  }

  updateDisplay();
}

export const calculatorKeys = {
  c: clear,
  s: switchSign,
  Backspace: handleBackspace,
  ".": useDecimal,
  "%": calculatePercentage,
  "=": operate,
  "+": () => setOperator(add),
  "-": () => setOperator(subtract),
  "*": () => setOperator(multiply),
  "/": () => setOperator(divide),
  0: () => handleNumberInput(0),
  1: () => handleNumberInput(1),
  2: () => handleNumberInput(2),
  3: () => handleNumberInput(3),
  4: () => handleNumberInput(4),
  5: () => handleNumberInput(5),
  6: () => handleNumberInput(6),
  7: () => handleNumberInput(7),
  8: () => handleNumberInput(8),
  9: () => handleNumberInput(9),
};
