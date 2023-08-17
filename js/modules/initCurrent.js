export function initCurrent() {
  const links = document.querySelectorAll(".header-nav-item a");
  const currentURL = window.location.href;

  links.forEach((link) => {
    if (link.href === currentURL) {
      link.classList.add("current");
    }
  });
}
