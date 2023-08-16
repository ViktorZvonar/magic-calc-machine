export const headerFooterLayout = function () {
  document.addEventListener("DOMContentLoaded", function () {
    fetch("/header.html")
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("header-placeholder").innerHTML = content;
      });

    fetch("/footer.html")
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("footer-placeholder").innerHTML = content;
      });
  });
};
