export default function Modal() {
  const modal = document.getElementById("modal");
  const image = document.querySelector(".hero-pic");
  const closeButton = document.querySelector(".close-button");

  if (modal && image && closeButton) {
    image.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
}
