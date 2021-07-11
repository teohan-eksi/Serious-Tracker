console.log("onSS.js");


addStopStopwatchListeners();

function addStopStopwatchListeners() {
  function saveStopwatchClick(event){
    event.preventDefault();

    window.ipc.insertObject({
      title: document.getElementById("title-stopwatch").value,
      description: document.getElementById("description-stopwatch").value
    });
  }
  document.getElementById("submit-stopwatch").addEventListener("click", saveStopwatchClick);
}
