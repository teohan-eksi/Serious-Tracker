console.log("history.js");


showDB();

function showDB() {
  window.ipc.showDB();
}

addHistoryPageListeners();

function addHistoryPageListeners(){
  function dbClick() {
    window.ipc.dbTest();
  }
  document.getElementById("db-connect").addEventListener("click", dbClick);
}
