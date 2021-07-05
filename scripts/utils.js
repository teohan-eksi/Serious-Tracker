


//loads a page to the div element with the id=root
function loadPage(pageURL){
  //xhr promise carries a resource file(HTML).
  xhrPromise(pageURL).then((value)=>{
    //value is an HTML block (innerHTML)
    const rootElem = document.getElementById("root");
    //div element with the id root got the page elements.
    rootElem.innerHTML = value;
    //return the id of the first element child of the root as a promise.
    return rootElem.firstElementChild;
  }).then((value)=>{
    //value = id of the top div element inside the root div element.
    if(pageURL=="pages/main-page-div.html"){
      addEventListeners();
    }else if(pageURL=="pages/timer-page-div.html"){
      //add the timer script to the div element with the timer-page id.
      //the script along with the div element will be removed when the page changes.
      value.appendChild(createScript("timer-script", "scripts/timer.js"));
    }
  });
}

//manage xhr connections
function xhrPromise(pathToRes){
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

function addEventListeners(){
  //main-page event listeners
  //update the page before loading new elements according to the context.
  //change title, remove main page specific elements, ...

  //timer app event listener
  document.getElementById("timer-page-btn").addEventListener("click", ()=>{
    document.title = "Serious Tracker | Timer";
    document.getElementById("main-page-div").remove();

    loadPage("pages/timer-page-div.html");
  });
}

function createScript(elemID, elemSrc){
  let newElem = document.createElement("script");
  newElem.id = elemID;
  newElem.src = elemSrc;
  return newElem;
}

function homeButton(removeID){
  document.title = "Serious Tracker";
  document.getElementById(removeID).remove();
  loadPage("pages/main-page-div.html");
}
