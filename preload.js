


//the contextBridge method is the recommended and safe method
//to send messages btw main and renderer processes.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
	//starts timer with the duration in the main process.
	startTimer: (duration) => {
		ipcRenderer.send('start-timer', duration);
	},

	clearInterval: () => {
		ipcRenderer.send('clear-interval');
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
	}
});
