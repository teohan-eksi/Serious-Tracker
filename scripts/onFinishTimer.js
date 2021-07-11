


addFinishTimerListeners();

function addFinishTimerListeners() {
  function saveTimerClick(event){
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

    if(document.getElementById("title-timer").value != ""){
      window.ipc.insertObject({
        date: timeStamp,
        title: document.getElementById("title-timer").value,
        description: document.getElementById("description-timer").value
      });

      timeStamp = null;

      //show notification.
    }else{
      console.log("title is required.");
    }
  }
  document.getElementById("submit-timer").addEventListener("click", saveTimerClick);

  function timerDiscardClick() {
    document.getElementById("h").value="";
		document.getElementById("min").value="";
		document.getElementById("sec").value="";
		document.getElementById("ticker").innerHTML = "";

    document.getElementById("reset-btn").remove();

    document.getElementById("on-finish-timer").remove();

    document.getElementById("start-btn").disabled = false;
		document.getElementById("start-stopwatch-btn").disabled = false;
  }
  //document.getElementById("timer-discard").addEventListener("click", timerDiscardClick);
}
