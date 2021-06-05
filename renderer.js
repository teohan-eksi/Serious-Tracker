// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//call to load main page elements in utils.js
document.addEventListener("DOMContentLoaded", ()=>{
  //create utils.js and append it to the body
  let utilsScript = document.createElement("script");
  utilsScript.id = "utils-script";
  utilsScript.src = "./scripts/utils.js";
  document.body.appendChild(utilsScript);
  //load main-page-div.html when the utils script is loaded.
  utilsScript.onload = () => {
    loadPage("pages/main-page-div.html");
  }
  utilsScript = null;
});
