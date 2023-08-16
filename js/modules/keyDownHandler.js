export default function keyDownHandler(buttons) {
  document.addEventListener("keydown", function (e) {
    const key = Array.from(buttons).find((button) => {
      const keys = button.getAttribute("data-key").split(",");
      return keys.includes(e.code);
    });

    if (key) {
      key.click();
    }
  });
}
