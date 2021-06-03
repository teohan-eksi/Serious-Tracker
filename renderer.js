// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.getElementById("timer").addEventListener("click", ()=>{
  let xhrResponseProm = xhrAction("pages/timer.html");

  xhrResponseProm.then((value)=>{
    createTimerDiv(value);
  }, (error)=>{
    console.log(error);
  });

  function createTimerDiv(value){
    let timerDiv = document.createElement("div");
    timerDiv.innerHTML = value;
    document.body.appendChild(timerDiv);
  }
});

function xhrAction(pathToRes){
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", pathToRes, true);

    xhr.onload = function(){
      if(this.status == 200){
        resolve(this.response);
      }
    }

    xhr.onerror = function(){
        reject("xhr error");
    }

    xhr.send();
  });
}
