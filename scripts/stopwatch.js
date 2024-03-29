


function startStopwatchBtn(){
  let stopwatchTicker = document.getElementById("stopwatch-ticker");

  window.ipc.startStopwatch();

  //the following animation function has been taken from Firefox website
  //It calls the callback every frame without clogging UI and delaying anything.
  function callback(timestamp){
    //get the time from main process by invoking a getter function with
    //the specific channel, 'time'. It resolves an array of size 4:
    // time = [hr, min, sec, totalTimePassed]
    stopwatchGetter('stopwatch-time').then((time) => {
        //console.log(time);
        stopwatchTicker.innerHTML = time[0]+" : "+time[1]+" : "+time[2];

        //remove any listener on the channel to save memory.
        window.ipc.removeListener('stopwatch-time');

        requestAnimationFrame(callback);//returns a unique ID, reqID.
    });
  }
  requestAnimationFrame(callback);

  //every time the stopwatch stops, one listener stays.
  //over multiple stops, this causes multiple calls to the getter.
  //to prevent this bug, clear the residual listener before starting the new
  //session so that the previous stack will be cleared.
  window.ipc.removeListener('stopwatch-time');

  //hide start buttons and show stop and reset buttons
  document.getElementById("start-btn").disabled = true;
  document.getElementById("start-stopwatch-btn").disabled = true;
  createStopButton();
  createStopwatchResetButton();
}

document.getElementById("start-stopwatch-btn").addEventListener("click", startStopwatchBtn);

function createStopButton(arr){
	let stopBtn = document.createElement("button");
	stopBtn.id = "stop-btn";
	stopBtn.innerHTML = "Stop";
  stopBtn.classList.add("page-buttons");
	document.getElementById("stopwatch-items-container").appendChild(stopBtn);

	stopBtn.addEventListener("click", ()=>{
    //if ticker shows multiple times, uncomment the below line.
    //window.ipc.removeListener('stopwatch-time');
    window.ipc.clearStopwatchInterval();

    loadPage("main-page-div", "./pages/on-stop-stopwatch.html")
      .then(()=>{
        addScript("on-stop-stopwatch", "./scripts/onStopStopwatch.js");
      });

		stopBtn.remove();
	});
}

function stopwatchGetter(ch){
	return window.ipc.returnPromiseFromMain(ch);
}

function createStopwatchResetButton(){
	let resetBtn = document.createElement("button");
	resetBtn.id = "reset-btn";
	resetBtn.innerHTML = "Reset";
  resetBtn.classList.add("page-buttons");
	document.getElementById("stopwatch-items-container").appendChild(resetBtn);

	resetBtn.addEventListener("click", ()=>{
		window.ipc.clearStopwatchInterval();

    document.getElementById("stopwatch-ticker").innerHTML = "0 : 0 : 0";

    document.getElementById("start-btn").disabled = false;
		document.getElementById("start-stopwatch-btn").disabled = false;

		resetBtn.remove();

    if(document.getElementById("stop-btn") != null){
        document.getElementById("stop-btn").remove();
    }
    if(document.getElementById("on-stop-stopwatch") != null){
      document.getElementById("on-stop-stopwatch").remove();
    }

	});
}
