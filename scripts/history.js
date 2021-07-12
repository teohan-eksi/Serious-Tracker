


showDB();

function showDB() {
  //get db and show it to the user.
  window.ipc.loadDB();

  let dbPromise = window.ipc.returnPromiseFromMain("get-db");
  dbPromise
    .then((docs)=>{
      let container = document.getElementById("db-table-container");

      container.appendChild(createElem("p", docs[0].date));
      container.appendChild(createElem("p", docs[0].title));
      container.appendChild(createElem("p", docs[0].duration));
      container.appendChild(createElem("p", docs[0].description));

    });
}

addHistoryPageListeners();

function addHistoryPageListeners(){

}
