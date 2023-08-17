export function initBurgerMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu");
  const headerNav = document.querySelector(".header-nav");

  if (mobileMenuButton && headerNav) {
    mobileMenuButton.addEventListener("click", function () {
      headerNav.classList.toggle("active");
    });
  }
}
