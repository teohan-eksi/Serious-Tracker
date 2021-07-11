console.log("history.js");


showDB();

function showDB() {
  //get db and show it to the user.
  console.log("show db");
  //window.ipc.showDB();
}

addHistoryPageListeners();

function addHistoryPageListeners(){
  function dbClick() {
    window.ipc.dbTest();
  }
  document.getElementById("db-connect").addEventListener("click", dbClick);
}
