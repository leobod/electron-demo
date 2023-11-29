const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('window_control', {

    toClose: () => ipcRenderer.send('close-app'),
    toMin: () => ipcRenderer.send('min-app'),
    toMax: () => ipcRenderer.send('max-app'),
    windowMove: (canMove) => ipcRenderer.send("window-move-open", canMove)
})