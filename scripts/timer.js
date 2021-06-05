


//back button call
document.getElementById("back-btn").addEventListener("click", ()=>{
	//backButton(removeID, addPage)
	backButton("timer-page-div", "main-page-div.html");
});

document.getElementById("start-btn").addEventListener("click", ()=>{
	let h = document.getElementById("h").value;
	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;
	let ticker = document.getElementById("ticker"); //where the h:min:sec is showed

	//init
	if(h === ""){
		h = 0;
	}
	if(min === ""){
		min = 0;
	}
	if(sec === ""){
		sec = 0;
	}

	let duration = h*3600 + min*60 + sec;
	duration *= 1; //make it a Number.
	//start timer with the duration
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
				ticker.innerHTML = time[0]+":"+time[1]+":"+time[2];

				//remove any listener on the channel 'time' to save memory.
				window.ipc.removeListener('time');

				//stop refreshing when the time limit is reached
				if(time[3] !== duration){
					requestAnimationFrame(callback);//returns a unique ID, reqID.
				}else {

				}
		});
	}
	requestAnimationFrame(callback);

	//hide start button and show reset button
	document.getElementById("start-btn").style.visibility = "hidden";
	createResetButton();
});

function getter(ch){
	return window.ipc.returnPromiseFromMain(ch);
}

function createResetButton(){
	let resetBtn = document.createElement("button");
	resetBtn.id = "reset-btn";
	resetBtn.innerHTML = "Reset";
	document.getElementById("timer-page-div")
		.insertBefore(resetBtn, document.getElementById("ticker"));

	resetBtn.addEventListener("click", ()=>{
		console.log("res");
		window.ipc.clearInterval();
	});
}
