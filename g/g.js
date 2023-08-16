import { updateDisplay } from "./modules/calculator.js";
import { listen } from "./modules/ui.js";

function start() {
  listen();
  updateDisplay();
}

start();
