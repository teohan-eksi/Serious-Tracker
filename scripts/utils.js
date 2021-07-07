


const rootElem = document.getElementById("root");

function loadPage(url){
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
  //home button
  function homeBtnClick(){
    //to prevent adding multiple event listener because of multiple clicks,
    //add only one event listener at the first load of index.html
    if(activePageID != "main-page-div"){
      document.title = "Serious Tracker";
      document.getElementById(activePageID).remove();
      loadPage("pages/main-page-div.html")
        .then(()=>{
          //add main page script
          addScript("timer", "./scripts/timer.js");
        });
      activePageID = "main-page-div"
    }
  }
  document.getElementById("home-btn").addEventListener("click", homeBtnClick);


  //history page button
  function historyBtnClick(){
    if(activePageID != "history-page-div"){
    document.title = "Serious Tracker | History";
    document.getElementById(activePageID).remove();
    loadPage("pages/history-page-div.html");
    //add history page script
    activePageID = "history-page-div";
    }
  }
  document.getElementById("history-page-btn").addEventListener("click", historyBtnClick);
}

function addScript(parentID, elemSrc){
  let newElem = document.createElement("script");
  newElem.src = elemSrc;
  document.getElementById(parentID).appendChild(newElem);
}
