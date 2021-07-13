


showDB();

function showDB() {
  //get db and show it to the user.
  window.ipc.loadDB();

  //get the number of items in the db, then start populating the container.
  let dbCountPromise = window.ipc.returnPromiseFromMain("get-db-count");
  dbCountPromise
    .then((dbCount)=>{
        let dbPromise = window.ipc.returnPromiseFromMain("get-db");
        dbPromise
          //docs is all the items in the db
          .then((docs)=>{
            let container = document.getElementById("db-table-container");
            for(let i = 0; i<dbCount; i++){
              //create a div. Put the date and delete button inside it,
              //then add the div to the table.
              let elemDate = document.createElement("div");
              //check out createElem() in utils.js
              elemDate.appendChild(createElem("p", docs[i].date));
              let deleteBtn = document.createElement("button");
              deleteBtn.innerHTML = "X";
              //add event listener to remove the entry.
              addDeleteBtnEL(elemDate, deleteBtn, docs[i].date);
              //append button to the div, div to the container and
              //move on to the other columns.
              elemDate.appendChild(deleteBtn);
              deleteBtn = null;
              container.appendChild(elemDate);
              elemDate = null;

              container.appendChild(createElem("p", docs[i].title));
              container.appendChild(createElem("p", docs[i].duration));
              container.appendChild(createElem("p", docs[i].description));
            }
        });
    });
}

function addDeleteBtnEL(removeThisEntry, deleteBtn, query) {
  deleteBtn.addEventListener("click", ()=>{
    window.ipc.removeEntry(query);

    //refresh the table after removing the entry
    document.getElementById("history-page-div").remove();
    loadPage("root", "pages/history-page-div.html")
      .then(()=>{
        showDB();
      });
  });
}

addHistoryPageListeners();

function addHistoryPageListeners(){

}
