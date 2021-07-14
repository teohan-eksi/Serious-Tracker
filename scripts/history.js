


//first business is to show the saved records.
showDB();

function showDB() {
  //request the db to be send through webcontents.send
  window.ipc.loadDB();

  //get the number of items in the db, then start populating the container.
  let dbCountPromise = window.ipc.returnPromiseFromMain("get-db-count");
  dbCountPromise
    .then((dbCount)=>{
        //get the db and show it to the user.
        let dbPromise = window.ipc.returnPromiseFromMain("get-db");
        dbPromise
          //docs is ALL the items in the db
          .then((docs)=>{
            let container = document.getElementById("db-table-container");
            for(let i = 0; i<dbCount; i++){
              //create a div. Put the date and delete button inside it,
              //then add the div to the table.
              let elemDate = document.createElement("div");
              //align the date and delete button in a flexbox.
              elemDate.style = "display: flex; align-items: center;";

              //check out createElem() in utils.js
              elemDate.appendChild(createElem("p", docs[i].date));

              //create a delete button
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


              //update operation
              //create a div. Put the description and update button inside it,
              //then add the div to the table.
              let elemDescription = document.createElement("div");
              //align the items in a flexbox.
              elemDescription.style = "display: flex; align-items: center;";

              elemDescription.appendChild(createElem("p", docs[i].description));

              //add an update button next to description
              let updateBtn = document.createElement("button");
              updateBtn.innerHTML = "U";
              //add event listener to update the entry
              addUpdateBtnEL(docs[i]._id, updateBtn);

              //append button to the div, div to the container.
              elemDescription.appendChild(updateBtn);
              updateBtn = null;
              container.appendChild(elemDescription);
              elemDescription = null;

              window.ipc.removeListener('get-db-count');
              window.ipc.removeListener('get-db');
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

function addUpdateBtnEL(entryID, updateBtn) {
  updateBtn.addEventListener("click", ()=>{
    loadPage("history-page-div", "./pages/update-entry.html")
      .then(()=>{
        //call the db to give the entry with the given ID.
        window.ipc.getEntrywithID(entryID);

        window.ipc.returnPromiseFromMain("get-your-entry")
          .then((entry)=>{
            //show the entry with the given ID.
            document.getElementById("update-entry-date").innerHTML =
              entry[0].date;
            document.getElementById("update-entry-title").value =
              entry[0].title;
            document.getElementById("update-entry-duration").innerHTML =
              entry[0].duration;
            document.getElementById("update-entry-description").value =
              entry[0].description;

            window.ipc.removeListener('get-your-entry');
          })
          .then(()=>{
            //add event listeners for submit and cancel buttons
            document.getElementById("cancel-update").addEventListener("click", ()=>{
              document.getElementById("update-entry").remove();
            });

            document.getElementById("submit-update").addEventListener("click", (event)=>{
              //update the entry with the new values and refresh the table.

              event.preventDefault();

              window.ipc.updateEntry(entryID,
                document.getElementById("update-entry-title").value,
                document.getElementById("update-entry-description").value);

              //remove the update form and refresh the table
              document.getElementById("update-entry").remove();
              //refresh the table after removing the entry
              document.getElementById("history-page-div").remove();
              loadPage("root", "pages/history-page-div.html")
                .then(()=>{
                  showDB();
                });
            });
          });
      });
  });
}
