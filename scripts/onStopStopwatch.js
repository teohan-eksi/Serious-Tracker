console.log("onSS.js");


addStopStopwatchListeners();

function addStopStopwatchListeners() {
  function saveStopwatchClick(event){
    event.preventDefault();

    let date = new Date();
    let timeStamp =
        date.getHours() + ":"
      + date.getMinutes() + ":"
      + date.getSeconds() + " -- "
      + date.getDate() + "/"
      + (date.getMonth() + 1) + "/"
      + date.getFullYear();

      date = null;

    if(document.getElementById("title-stopwatch").value != ""){
      window.ipc.insertObject({
        date: timeStamp,
        title: document.getElementById("title-stopwatch").value,
        description: document.getElementById("description-stopwatch").value
      });

      timeStamp = null;

      //show notification.
    }else{
      console.log("title is required.");
    }
  }
  document.getElementById("submit-stopwatch").addEventListener("click", saveStopwatchClick);
}
