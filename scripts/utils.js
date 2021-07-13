


function loadPage(parentID, url){
  return fetch(url)
    .then(response => response.text())
    .then(response => {
      // Convert the HTML response text into an html object if necessary.
      let parser = new DOMParser();
  	  let html_doc = parser.parseFromString(response, 'text/html');

      //get the one and only child of the body element
      //which will be added to the element with parentID
      document.getElementById(parentID)
        .appendChild(html_doc.body.childNodes[0]);

      console.log(url + " loaded");

      //return stuff; if necessary.
    });
}

function addIndexEventListeners(){
  let loadPagePromise = null;

  //home button
  function homeBtnClick(){
    //to prevent adding multiple event listener because of multiple clicks,
    //add only one event listener at the first load of index.html
    if(activePageID != "main-page-div"){
      document.title = "Serious Tracker";

      document.getElementById(activePageID).remove();

      loadPagePromise = loadPage("root", "pages/main-page-div.html");
      loadPagePromise
        .then(()=>{
          activePageID = null;//release the previous value to prevent a leak
          activePageID = "main-page-div"
          //add main page script
          addScript("timer", "./scripts/timer.js");
        })
        .then(()=>{
          addScript("stopwatch", "./scripts/stopwatch.js")
        });
      loadPagePromise = null;

      console.log("homeBtnClick");
    }
  }
  document.getElementById("home-btn").addEventListener("click", homeBtnClick);

  //history page button
  function historyBtnClick(){
    if(activePageID != "history-page-div"){
      document.title = "Serious Tracker | History";

      document.getElementById(activePageID).remove();

      loadPagePromise = loadPage("root", "pages/history-page-div.html");
      loadPagePromise
        .then(()=>{
          activePageID = null;//release the previous value to prevent a possible leak
          activePageID = "history-page-div";

          addScript("history-page-div", "./scripts/history.js");
        });
      loadPagePromise = null;

      console.log("historyBtnClick");
    }
  }
  document.getElementById("history-page-btn").addEventListener("click", historyBtnClick);
}

function addScript(parentID, elemSrc){
  let newElem = document.createElement("script");
  newElem.src = elemSrc;
  document.getElementById(parentID).appendChild(newElem);
  newElem = null;
}

function createElem(elemTag, inner) {
  let elem = document.createElement(elemTag);
  elem.innerHTML = inner;
  elem.style = "display:inline;";
  return elem;
}

//insert object to the db
function insertObject(obj) {
  window.ipc.insertObject(obj);
}
