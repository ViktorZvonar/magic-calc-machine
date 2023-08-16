import { headerFooterLayout } from "./modules/headerFooterLayout.js";
import { updateDisplay } from "./modules/calculator.js";
import { listen } from "./modules/ui.js";
import { modal } from "./modules/modal-window.js";

headerFooterLayout();
modal();

const display = document.getElementById("display");

if (display) {
  function start() {
    listen();
    updateDisplay();
  }

  start();
}
