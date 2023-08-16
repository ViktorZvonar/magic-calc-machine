export default function updateDisplay(displayValue) {
  const display = document.getElementById("display");
  if (!display) {
    return;
  }
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
}
