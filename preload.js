


//TODOs, comment
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
	startTimer: (duration) => {
		ipcRenderer.send('start-timer', duration);
	},

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
