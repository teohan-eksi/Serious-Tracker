let startBtn = document.getElementById("start");

startBtn.addEventListener("click", startTimer);

function startTimer(){
	let h = document.getElementById("h").value;
	let min = document.getElementById("min").value;
	let sec = document.getElementById("sec").value;
	let ticker = document.getElementById("ticker");

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
	duration *= 1;
	window.ipc.startTimer(duration);

	function callback(timestamp){
		getter('time').then((time) => {
				//refresh ticker when refocused.
				ticker.innerHTML = time[0]+":"+time[1]+":"+time[2];

				window.ipc.removeListener('time');
				if(time[3] !== duration){
					requestAnimationFrame(callback);//returns a unique ID, reqID.
				}else {

				}
		});
	}

	requestAnimationFrame(callback);
}


/*window.ipc.data((value) => {
	console.log(value);
});*/

function getter(ch){
	return window.ipc.returnPromiseFromMain(ch);
}
