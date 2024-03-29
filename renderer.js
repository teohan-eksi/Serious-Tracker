// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let activePageID = null;

//load utils.js which is to be used in renderer process features.
document.addEventListener("DOMContentLoaded", ()=>{
  //create utils.js and append it to the body
  let utilsScript = document.createElement("script");
  utilsScript.id = "utils-script";
  utilsScript.src = "./scripts/utils.js";
  document.body.appendChild(utilsScript);
  //load main-page-div.html when the utils script is loaded.
  utilsScript.onload = () => {
    //load main-page as default opening page
    //returns a fetch promise
    loadPage("root", "pages/main-page-div.html")
      .then(()=>{
        activePageID = "main-page-div";
        addIndexEventListeners();
      })
      .then(()=>{
        //add a script to manage main-page features
        addScript("timer", "./scripts/timer.js");
      })
      .then(()=>{
        addScript("stopwatch", "./scripts/stopwatch.js")
      }).then(()=>{
        //connect to the database
        window.ipc.connectDB();
      });
  }
  utilsScript = null;
});
