// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


document.getElementById("timer").addEventListener("click", ()=>{

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "pages/timer.html", true);

  xhr.onload = function(){
    if(this.status == 200){
      let timerDiv = document.createElement("div");
      timerDiv.innerHTML = this.response;
      document.body.appendChild(timerDiv);
    }
  };

  xhr.send();
});
