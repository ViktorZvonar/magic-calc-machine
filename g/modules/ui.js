import { calculatorKeys } from "./modules/calculator";

export function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${state.visibleOperand}`;
}

export function listen() {
  for (const [key, keyHandler] of Object.entries(calculatorKeys)) {
    const button = document.querySelector(`[data-key="${key}"`);
    button.addEventListener("click", keyHandler);
  }

  document.addEventListener("keydown", handleKeyboardPress);
}

function handleKeyboardPress(event) {
  const keyHandler = calculatorKeys[event.key];
  if (keyHandler) keyHandler();
}
