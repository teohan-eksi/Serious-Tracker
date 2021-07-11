


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
}
