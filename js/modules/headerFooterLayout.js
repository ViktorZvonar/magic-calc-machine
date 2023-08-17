export const headerFooterLayout = function () {
  document.addEventListener("DOMContentLoaded", function () {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const basePath = isLocalhost ? "." : "/magic-calc-machine";

    Promise.all([
      fetch(`${basePath}/header.html`).then((response) => response.text()),
      fetch(`${basePath}/footer.html`).then((response) => response.text()),
    ]).then(([headerContent, footerContent]) => {
      document.getElementById("header-placeholder").innerHTML = headerContent;
      document.getElementById("footer-placeholder").innerHTML = footerContent;

      const loadedEvent = new Event("eventLoaded");
      document.dispatchEvent(loadedEvent);
    });
  });
};
