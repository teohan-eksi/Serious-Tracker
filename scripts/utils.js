


console.log("utils.js");

const rootElem = document.getElementById("root");

function loadPage(url){
  rootElem.innerHTML = null;

  return fetch(url)
    .then(response => response.text())
    .then(response => {
      // Convert the HTML response text into a document object if necessary.
      //let parser = new DOMParser();
  	  //let html_doc = parser.parseFromString(html, 'text/html');

      rootElem.innerHTML = response;
      console.log(url + " loaded");

      //return stuff; if necessary.
    });
}

function addIndexEventListeners(){
  console.log("addIndexEventListeners");

  let loadPagePromise = null;

  //home button
  function homeBtnClick(){
    //to prevent adding multiple event listener because of multiple clicks,
    //add only one event listener at the first load of index.html
    if(activePageID != "main-page-div"){
      document.title = "Serious Tracker";

      document.getElementById(activePageID).remove();

      loadPagePromise = loadPage("pages/main-page-div.html");
      loadPagePromise
        .then(()=>{
          activePageID = null;//release the previous value to prevent a leak
          activePageID = "main-page-div"
          //add main page script
          addScript("timer", "./scripts/timer.js");
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

      loadPagePromise = loadPage("pages/history-page-div.html");
      loadPagePromise
        .then(()=>{
          activePageID = null;//release the previous value to prevent a leak
          activePageID = "history-page-div"
          //add history page script
          //addScript("parentID", "./scripts/.js");
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
