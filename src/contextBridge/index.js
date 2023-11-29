const p = require('path')

const {
    app,
    BrowserWindow
} = require('electron')

const createWindow = () => {
    console.log(p.join(__dirname, './render/preload.js'))
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: p.join(__dirname, './render/preload.js')
        }
    })
    win.loadURL('http://192.168.1.188:9993/')
    // win.loadURL('http://39.98.255.142:6037/web/index.html')
    win.webContents.toggleDevTools()
}

app.whenReady().then(() => {
    // 创建窗口
    createWindow();
});

app.on('will-quit', () => {

});

