// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

//load main page elements here.
document.addEventListener("DOMContentLoaded", ()=>{
  //return a promise that gives a response.
  let xhrResponseProm = xhrAction("pages/main-page-elements.html");

  xhrResponseProm.then((value)=>{
    //value is an HTML block
    createElem("div", value);
    //be careful for future listeners
    addEventListeners();
  }, (error)=>{
    console.log(error);
  });

});

function addEventListeners(){
  //it may require a promise in the future!
  //timer app EventListener
  document.getElementById("timer").addEventListener("click", ()=>{
    //return a promise that gives a response.
    let xhrResponseProm = xhrAction("pages/timer.html");

    //update the page before loading new elements according to the context.
    //change title, remove main page specific elements
    document.title = "Serious Tracker | Timer";
    document.getElementById("main-page-elems").remove();

    xhrResponseProm.then((value)=>{
      //value is an HTML block
      createElem("div", value);
      //script tag should be specifically created, otherwise it won't be initialized.
      createElem("script", "").src = "scripts/timer.js";
    }, (error)=>{
      console.log(error);
    });

  });
}

//value is an HTML block
function createElem(elem, value){
  let newElem = document.createElement(elem);
  newElem.innerHTML = value;
  document.body.appendChild(newElem);
  return newElem;
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
