// Instantiate menu
const $ = document.querySelector.bind(document);
const btn = $("[data-click=menu-toggle]");
const body = $("body");

btn.addEventListener("click", () => {
  body.classList.toggle("menu-closed");
});

// Load Service Worker
//------------------------------------------------------------------------------
const isProd = location.hostname !== "localhost";
if (isProd && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
