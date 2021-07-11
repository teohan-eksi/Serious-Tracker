


showDB();

function showDB() {
  //get db and show it to the user.
  window.ipc.loadDB();

  let dbPromise = window.ipc.returnPromiseFromMain("get-db");
  dbPromise
    .then((docs)=>{
      console.log(docs);
    });
}

addHistoryPageListeners();

function addHistoryPageListeners(){

}
