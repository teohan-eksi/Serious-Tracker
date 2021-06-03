// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//load main page elements here.
document.addEventListener("DOMContentLoaded", ()=>{
  //console.log("dom con load");
  //return a promise that gives a response.
  let xhrResponseProm = xhrAction("pages/main-page-elements.html");

  xhrResponseProm.then((value)=>{
    //value is an HTML block
    createDiv(value);
    addEventListeners();
  }, (error)=>{
    console.log(error);
  });

});

function addEventListeners(){
  //timer app EventListener
  document.getElementById("timer").addEventListener("click", ()=>{
    //return a promise that gives a response.
    let xhrResponseProm = xhrAction("pages/timer.html");

    //update the page before loading new elements according to the context.
    //change title, remove main page specific elements

    xhrResponseProm.then((value)=>{
      //value is an HTML block
      createDiv(value);
    }, (error)=>{
      console.log(error);
    });
  });
}

//value is an HTML block
function createDiv(value){
  let newDiv = document.createElement("div");
  newDiv.innerHTML = value;
  document.body.appendChild(newDiv);
}

function xhrAction(pathToRes){
  return new Promise((resolve, reject) => {
    //create an xhr object.
    let xhr = new XMLHttpRequest();

    // GET the resource located by the path.
    xhr.open("GET", pathToRes, true);

    //overriding onload function to resolve the promise with the response.
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
