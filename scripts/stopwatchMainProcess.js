


let stopwatchTickerInterval = null;
function stopwatch(webContents){
  //setting 1 sec intervals and sending them to the renderer.
  let time = [0, 0, 0, 0];// hr, min, sec, total time passed.
  let totalT = 0;

  stopwatchTickerInterval = setInterval(() => {
    time[2] = totalT%60; //set seconds
    if(time[2] === 0 && totalT !== 0){
      time[1]++;//minute increment
      if(time[1] === 60){
        time[1] = 0;//reset minutes
        time[0]++;//hour increment
      }
    }

    //send the result to render it on the screen in the ticker.
    webContents.send('stopwatch-time', time);

    totalT++;
    time[3] = totalT; //update duration after every tick.
  }, 1000);//1 second intervals
}

function clearStopwatchInterval(){
  clearInterval(stopwatchTickerInterval);
}

module.exports = {
  stopwatch,
  clearStopwatchInterval
}
