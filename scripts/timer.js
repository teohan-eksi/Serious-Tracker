


document.getElementById("start-btn").addEventListener("click", ()=>{
	let h = document.getElementById("h").value;
	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;

	let ticker = document.getElementById("ticker");

	//init time values. Make them 0 if they were left empty; convert to number
	// if an input was given.
	if(h === ""){
		h = 0;
	}else{
		h *= 1;
	}
	if(min === ""){
		min = 0;
	}else{
		min *= 1;
	}
	if(sec === ""){
		sec = 0;
	}else{
		sec *= 1;
	}

	let duration = h*3600 + min*60 + sec;
	//start timer with the duration
	if(duration != 0){
		window.ipc.startTimer(duration);

		//the following animation function has been taken from Firefox website
		//It calls the callback every frame without clogging UI and delaying anything.
		function callback(timestamp){
			//how to call getter function at every 30th frame?
			//get the time from main process by invoking a getter function with
			//the specific channel, 'time'. It resolves an array of size 4:
			// time = [hr, min, sec, totalTimePassed]
			getter('time').then((time) => {
					//TODO refresh ticker when refocused.
					console.log(time);
					ticker.innerHTML = time[0]+" : "+time[1]+" : 	"+time[2];

					//remove any listener on the channel 'time' to save memory.
					window.ipc.removeListener('time');

					//stop refreshing when the time limit is reached
					console.log(duration);
					if(time[3] !== duration){
						requestAnimationFrame(callback);//returns a unique ID, reqID.
					}else {
						onFinishTimer();
					}
			});
		}
		requestAnimationFrame(callback);

		//every time the timer stops, one listener stays.
	  //over multiple stops, this causes multiple calls to the getter.
	  //to prevent this bug, clear the residual listener before starting the new
	  //session so that the previous stack will be cleared.
		window.ipc.removeListener('time');

		//hide start buttons and show reset button
		document.getElementById("start-btn").disabled = true;
		document.getElementById("start-stopwatch-btn").disabled = true;
		createResetButton();
	}
});

function getter(ch){
	return window.ipc.returnPromiseFromMain(ch);
}

//create a reset button and add reset logic.
function createResetButton(){
	let resetBtn = document.createElement("button");
	resetBtn.id = "reset-btn";
	resetBtn.innerHTML = "Reset";
	resetBtn.classList.add("page-buttons");
	document.getElementById("timer-items-container").appendChild(resetBtn);

	resetBtn.addEventListener("click", ()=>{
		window.ipc.clearTimerInterval();

		document.getElementById("h").value="";
		document.getElementById("min").value="";
		document.getElementById("sec").value="";
		document.getElementById("ticker").innerHTML = "";

		if(document.getElementById("on-finish-timer") != null){
      document.getElementById("on-finish-timer").remove();
    }

		document.getElementById("start-btn").disabled = false;
		document.getElementById("start-stopwatch-btn").disabled = false;

		resetBtn.remove();
	});
}

function onFinishTimer(){
	//add the form div and implent the functionalities.
	console.log("timer finished");

	loadPage("main-page-div", "./pages/on-finish-timer.html")
		.then(()=>{
			addScript("on-finish-timer", "./scripts/onFinishTimer.js");
		});
}
