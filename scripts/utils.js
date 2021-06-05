


//loads a page to the div element with the id=root
function loadPage(pageURL){
  //xhr promise carries a resource(HTML).
  xhrPromise(pageURL).then((value)=>{
    //value is an HTML block (innerHTML)
    const rootElem = document.getElementById("root");
    rootElem.innerHTML = value;
    return rootElem.firstElementChild;
  }).then((value)=>{
    if(pageURL=="pages/main-page-div.html"){
      addEventListeners();
    }else if(pageURL=="pages/timer-page-div.html"){
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
  //it may require a promise in the future!

  //main-page event listeners
  //timer app event listener
  document.getElementById("timer-page-btn").addEventListener("click", ()=>{
    //update the page before loading new elements according to the context.
    //change title, remove main page specific elements
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
  //document.body.appendChild(newElem);
}

function backButton(removeID, addPage){
  document.getElementById(removeID).remove();
  loadPage("pages/main-page-div.html");
}
