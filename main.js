// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')//for preload

let webContents;// to send messages to the renderer.
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload is used for IPC.
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  //to send messages from main to renderer.
  webContents = mainWindow.webContents;
  webContents.on('did-finish-load', () => {
    sendToRenderer();
 })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//put this in another file, later.
//TODOs, comment
const { Notification, ipcMain, ipcRenderer} = require('electron');

ipcMain.on('start-timer', (event, duration) => {
  //setting 1 sec intervals and sending them to the renderer.
  let time = [0, 0, 0, 0];
  let totalT = 0;
  let tickerInterval = setInterval(() => {
    time[2] = totalT%60;
    if(time[2] === 0 && totalT !== 0){
      time[1]++;
      if(time[1] === 60){
        time[1] = 0;
        time[0]++;
      }
    }

    webContents.send('time', time);

    if(totalT >= duration){
      clearInterval(tickerInterval);
      timeIsUp();
    }
    totalT++;
    time[3] = totalT;
  }, 1000);
});

function timeIsUp(){
  const notification = {
        title: 'Serious Tracker',
        body: 'Time is up!'
      };
      new Notification(notification).show();
}

function sendToRenderer(){
  //for renderer initialization after loading
  //webContents.send('ch1', 'hi!');
}