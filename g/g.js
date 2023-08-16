import { listen } from "./modules/ui";
import { updateDisplay } from "./modules/utils";

function start() {
  listen();
  updateDisplay();
}

start();
