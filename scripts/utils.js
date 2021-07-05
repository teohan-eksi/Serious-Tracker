


let activePageID;

//loads a page to the div element with the id="root"
//this function is a bit complex :(
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
      activePageID = "main-page-div";
      addEventListeners();
    }else if(pageURL=="pages/time-page-div.html"){
      activePageID = "time-page-div";
      //add the timer script to the div element with the time-page-div id.
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

  //time page button
  function timeBtnClick(){
    document.title = "Serious Tracker | Time";
    document.getElementById("main-page-div").remove();
    loadPage("pages/time-page-div.html");
    //activePageID = "time-page-div"
    //----
    //event listener doesn't removed when the script removed,
    //so remove it immediately after a click and the button
    //will be a one click button as well.
    document.getElementById("time-page-btn").removeEventListener("click", timeBtnClick);
  }
  document.getElementById("time-page-btn").addEventListener("click", timeBtnClick);

  //home button
  function homeBtnClick(){
    //to prevent adding multiple event listener because of multiple click,
    //add only one event listener at the first load of main page.
    if(activePageID != "main-page-div"){
      document.title = "Serious Tracker";
      document.getElementById(activePageID).remove();
      loadPage("pages/main-page-div.html");
      //activePageID = "main-page-div"
      //----
      //event listener isn't removed when the script element removed,
      //so remove it immediately after a click and the button
      //will be a one click button as well.
      document.getElementById("home-btn").removeEventListener("click", homeBtnClick);
    }
  }
  document.getElementById("home-btn").addEventListener("click", homeBtnClick);

}

function createScript(elemID, elemSrc){
  let newElem = document.createElement("script");
  newElem.id = elemID;
  newElem.src = elemSrc;
  return newElem;
}
