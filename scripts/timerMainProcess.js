




let tickerInterval = null;
function timer(duration, webContents){
  //setting 1 sec intervals and sending them to the renderer.
  let time = [0, 0, 0, 0];// hr, min, sec, total time passed.
  let totalT = 0;

  tickerInterval = setInterval(() => {
    time[2] = totalT%60; //set seconds
    if(time[2] === 0 && totalT !== 0){
      time[1]++;//minute increment
      if(time[1] === 60){
        time[1] = 0;//reset minutes
        time[0]++;//hour increment
      }
    }

    webContents.send('time', time);

    if(totalT >= duration){
      clearInterval(tickerInterval);
      timeIsUp(webContents);//show notification to the user.
    }
    totalT++;
    time[3] = totalT; //update total time after every tick.
  }, 1000);//1 second intervals
}

function clearTimeInterval(){
  clearInterval(tickerInterval);
}

//show notification to the user.
const { Notification} = require('electron');

function timeIsUp(webContents){
  const notification = {
        title: 'Serious Tracker',
        body: 'Time is up!'
      };
  new Notification(notification).show();

  //
  //webContents.send("on-finish-timer", true);
}

module.exports = {
  timer,
  clearTimeInterval
}
