// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//call to load main page elements in utils.js
document.addEventListener("DOMContentLoaded", ()=>{
  loadPage("pages/main-page-div.html");
});
