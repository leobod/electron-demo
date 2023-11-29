const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let win = {
    mainWindow: null,
    subWindow: null
}

function createWindow() {
    win.mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, './render/preload.js')
        }
    })

    /* 多窗口管理 */
    // win.subWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600
    // })

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    })

    win.mainWindow.loadFile('./web/index.html')

    // win.subWindow.loadURL('http://192.168.1.188:9993/')

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})