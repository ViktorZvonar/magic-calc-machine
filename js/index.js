import { headerFooterLayout } from "./modules/headerFooterLayout.js";
import { updateDisplay } from "./modules/calculator.js";
import { listen } from "./modules/ui.js";
import { modal } from "./modules/modal-window.js";
import { initBurgerMenu } from "./modules/initBurgerMenu.js";
import { initCurrent } from "./modules/initCurrent.js";

headerFooterLayout();
modal();
initBurgerMenu();

const calculator = document.getElementById("calculator");

if (calculator) {
  function start() {
    listen();
    updateDisplay();
  }

  start();
}

document.addEventListener("eventLoaded", function () {
  initCurrent();
  initBurgerMenu();
});
