


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

    //save the tracking result
    if(document.getElementById("title-stopwatch").value != ""){
      window.ipc.insertObject({
        date: timeStamp,
        title: document.getElementById("title-stopwatch").value,
        description: document.getElementById("description-stopwatch").value,
        duration: document.getElementById("stopwatch-ticker").innerHTML
      });

      timeStamp = null;

      //show notification.
      window.ipc.showSavedNot();
    }else{
      console.log("title is required.");
    }
  }
  document.getElementById("submit-stopwatch").addEventListener("click", saveStopwatchClick);

  function stopwatchDiscardClick() {
    document.getElementById("reset-btn").remove();
    document.getElementById("stopwatch-ticker").innerHTML = "0 : 0 : 0";

    document.getElementById("on-stop-stopwatch").remove();

    document.getElementById("start-btn").disabled = false;
		document.getElementById("start-stopwatch-btn").disabled = false;
  }
  document.getElementById("discard-stopwatch").addEventListener("click", stopwatchDiscardClick);
}
