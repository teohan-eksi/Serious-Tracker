


//the contextBridge method is the recommended and safe method
//to send messages btw main and renderer processes.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
	//starts timer with the duration in the main process.
	startTimer: (duration) => {
		ipcRenderer.send('start-timer', duration);
	},

	startStopwatch: () => {
		ipcRenderer.send('start-stopwatch');
	},

	clearTimerInterval: () => {
		ipcRenderer.send('clear-timer-interval');
	},

	clearStopwatchInterval: () => {
		ipcRenderer.send('clear-stopwatch-interval');
	},

	//does what it promised upon request from a renderer process.
	returnPromiseFromMain: (channel) => {
		return myP = new Promise((resolve) => {
			ipcRenderer.on(channel, (event, data) => {
				resolve(data);
			});
		});
	},

	removeListener: (ch) => {
		ipcRenderer.removeAllListeners(ch);
	},

	//NeDB
	dbTest: () => {
		ipcRenderer.send("db-test");
	},

	connectDB: () => {
		ipcRenderer.send("connect-db");
	},

	insertObject: (obj) => {
		ipcRenderer.send("insert-myObject", obj);
	},

	showSavedNot: () => {
		ipcRenderer.send("show-saved-not");
	},

	loadDB: () => {
		ipcRenderer.send("load-db");
	},

	removeEntry: (query) => {
		ipcRenderer.send("remove-entry", query);
	}
});
