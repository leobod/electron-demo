const {
    app,
    BrowserWindow
} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    // 加载本地的 html
    win.loadFile('./web/index.html')
    // 打开开发者工具
    win.webContents.toggleDevTools()
}

app.whenReady().then(createWindow)
