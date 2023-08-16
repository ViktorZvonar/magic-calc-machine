import { calculatorKeys } from "./calculator.js";

export function listen() {
  for (const [key, keyHandler] of Object.entries(calculatorKeys)) {
    const button = document.querySelector(`[data-key="${key}"]`);
    if (button) {
      button.addEventListener("click", keyHandler);
    } else {
      console.warn(`No element found for key: ${key}`);
    }
  }

  document.addEventListener("keydown", handleKeyboardPress);
}

function handleKeyboardPress(event) {
  const keyHandler = calculatorKeys[event.key];
  if (keyHandler) keyHandler();
}
