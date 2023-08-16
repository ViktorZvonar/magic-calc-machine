export const headerFooterLayout = function () {
  document.addEventListener("DOMContentLoaded", function () {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const basePath = isLocalhost ? "./pages" : "/magic-calc-machine/pages";

    fetch(`${basePath}/header.html`)
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("header-placeholder").innerHTML = content;
      });

    fetch(`${basePath}/footer.html`)
      .then((response) => response.text())
      .then((content) => {
        document.getElementById("footer-placeholder").innerHTML = content;
      });
  });
};
