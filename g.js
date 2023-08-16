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

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${state.visibleOperand}`;
}

function operate() {
  if (!state.operator) return;

  const result = state.operator(+state.hiddenOperand, +state.visibleOperand);
  const truncatedResult = String(result);
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
  updateDisplay();
}

function useDecimal() {
  const isDecimal = state.visibleOperand.includes(".");
  if (isDecimal) return;
  handleInput(".");
}

function calculatePercentage() {
  state.visibleOperand = String(+state.visibleOperand / 100);
  updateDisplay();
}

function clear() {
  state.visibleOperand = state.hiddenOperand = "0";
  state.operator = null;
  updateDisplay();
}

function handleInput(input) {
  if (!state.hasTypedAfterOperation) {
    state.hiddenOperand = state.visibleOperand;
    state.visibleOperand = "0";
    state.hasTypedAfterOperation = true;
  }

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
}

function handleKeyboardPress(event) {
  const isNumber = /[0-9]/.test(event.key);

  if (isNumber) handleInput(event.key);
  else if (event.key === "Backspace") handleBackspace();
  else if (event.key === "+") setOperator(add);
  else if (event.key === "-") setOperator(subtract);
  else if (event.key === "*") setOperator(multiply);
  else if (event.key === "/") setOperator(divide);
  else if (event.key === "=") operate();
  else if (event.key === ".") useDecimal();
  else if (event.key === "%") calculatePercentage();
  else if (event.key === "s") switchSign();
  else if (event.key === "c") clear();

  updateDisplay();
}

function listen() {
  const buttonClear = document.querySelector('[data-key="8"]');
  const buttonSign = document.querySelector('[data-key="192"]');
  const buttonPercentage = document.querySelector('[data-key="80"]');
  const buttonDecimal = document.querySelector('[data-key="190"]');
  const buttonDivide = document.querySelector('[data-key="68"]');
  const buttonMultiply = document.querySelector('[data-key="88"]');
  const buttonSubtract = document.querySelector('[data-key="173"]');
  const buttonAdd = document.querySelector('[data-key="61"]');
  const buttonEquals = document.querySelector('[data-key="69"]');
  const button0 = document.querySelector('[data-key="48"]');
  const button1 = document.querySelector('[data-key="49"]');
  const button2 = document.querySelector('[data-key="50"]');
  const button3 = document.querySelector('[data-key="51"]');
  const button4 = document.querySelector('[data-key="52"]');
  const button5 = document.querySelector('[data-key="53"]');
  const button6 = document.querySelector('[data-key="54"]');
  const button7 = document.querySelector('[data-key="55"]');
  const button8 = document.querySelector('[data-key="56"]');
  const button9 = document.querySelector('[data-key="57"]');

  buttonClear.addEventListener("click", clear);
  buttonSign.addEventListener("click", switchSign);
  buttonDecimal.addEventListener("click", useDecimal);
  buttonPercentage.addEventListener("click", calculatePercentage);
  buttonEquals.addEventListener("click", operate);
  buttonAdd.addEventListener("click", () => setOperator(add));
  buttonSubtract.addEventListener("click", () => setOperator(subtract));
  buttonMultiply.addEventListener("click", () => setOperator(multiply));
  buttonDivide.addEventListener("click", () => setOperator(divide));
  button0.addEventListener("click", () => handleInput(0));
  button1.addEventListener("click", () => handleInput(1));
  button2.addEventListener("click", () => handleInput(2));
  button3.addEventListener("click", () => handleInput(3));
  button4.addEventListener("click", () => handleInput(4));
  button5.addEventListener("click", () => handleInput(5));
  button6.addEventListener("click", () => handleInput(6));
  button7.addEventListener("click", () => handleInput(7));
  button8.addEventListener("click", () => handleInput(8));
  button9.addEventListener("click", () => handleInput(9));
  document.addEventListener("keydown", handleKeyboardPress);
}

function start() {
  listen();
  updateDisplay();
}

start();
